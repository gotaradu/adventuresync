package com.adventuresync.adventuresync.strava.services;

import com.adventuresync.adventuresync.strava.exceptions.*;
import com.adventuresync.adventuresync.strava.model.DataForAccess;
import com.adventuresync.adventuresync.strava.model.SummaryAthlete;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;

@Service
public class StravaLoginService {

    @Value("${server.address}")
    private String ipAddress;

    private final DataForAccessService dataForAccessService;
    private final TokenService tokenService;
    private final CookieService cookieService;
    private final AthleteService athleteService;

    public StravaLoginService(DataForAccessService dataForAccessService, TokenService tokenService, CookieService cookieService, AthleteService athleteService) {
        this.dataForAccessService = dataForAccessService;
        this.tokenService = tokenService;
        this.cookieService = cookieService;
        this.athleteService = athleteService;
    }

    public RedirectView loginWithStrava(String code, String scope, HttpServletResponse response) {
        System.out.println(code);
        try {
            if (scope.equals("read,activity:read_all,read_all")) {
                DataForAccess dataForAccess = tokenService.getDataForAccess(code, scope);
                dataForAccessService.persistDataForAccess(dataForAccess);
                cookieService.attachCookieToResponse(response, true, dataForAccess.getJwtToken());
                String redirectUrl = "http://" + ipAddress + ":3000";
                return new RedirectView(redirectUrl);
            } else if (code == null) {
                return new RedirectView("http://" + ipAddress + ":3000" + "/err?errorMessage=invalid_code_provided:" + code);
            } else {
                return new RedirectView("http://" + ipAddress + ":3000" + "/err?errorMessage=invalid_scopes_provided:" + scope);
            }
        } catch (DataForAccessException e) {
            return new RedirectView("http://" + ipAddress + ":3000" + "/err?errorMessage=" + e.getErrorCode().getMessage());
        }
    }

    public DataForAccess getNewAccessToken(String jwt) throws SummaryAthleteException {

        try {
            String athleteId = tokenService.getAthleteIdFromJwt(jwt);
            System.out.println(athleteId + " athlete from old jwt");
            DataForAccess data = dataForAccessService.getDataFromToken(jwt); // cauta in database sa vedem daca exista data pt jwt primit
            System.out.println(data + " data from database");
            // daca exista, facem un req la strava cu refresh tokenul
            DataForAccess newData = tokenService.getDataForRefresh(data.getRefreshToken(), athleteId);// ddata returned from strava
            System.out.println(data.getRefreshToken() + " asta e refresh token");
            //aici nu se trimite athlete
            System.out.println(newData + " this is new data");
            SummaryAthlete athlete = athleteService.getAthleteById(athleteId);
            System.out.println(athlete + " this is athlete from database ");
            newData.setSummaryAthlete(athlete);
            dataForAccessService.updateData(newData);
            return newData;

        } catch (SummaryAthleteException | DataForAccessException | JwtException e) { // custom aici
            System.out.println(e.getMessage());
        }
        throw new DataForAccessException(ErrorCode.ERR0105, null);
    }

    public SummaryAthlete getAthleteFromJwt(HttpServletRequest request) throws JwtException {
        Optional<String> jwtCookie = cookieService.getJwtCookie("jwt", request);
        if (jwtCookie.isEmpty())
            throw new JwtException(ErrorCode.ERR0106, null);
        if (!tokenService.isExpiredJwt(jwtCookie.get())) {
            return dataForAccessService.getDataFromToken(jwtCookie.get()).getSummaryAthlete();
        } else {
            System.out.println(jwtCookie.get());
            throw new JwtException(ErrorCode.ERR0101, "ce  intra aici");
        }
    }

    public void sentRefreshResponse(HttpServletResponse httpResponse, String jwt) throws IOException {
        try {
            DataForAccess data = getNewAccessToken(jwt);
            cookieService.attachCookieToResponse(httpResponse, true, data.getJwtToken());
            sendResponse(httpResponse, HttpStatus.OK, data.getSummaryAthlete());
        } catch (Exception e) {
            sendResponse(httpResponse, HttpStatus.valueOf(HttpServletResponse.SC_INTERNAL_SERVER_ERROR), e);
        }
    }

    private void sendResponse(HttpServletResponse httpResponse, HttpStatus status, Object responseBody) throws IOException {
        httpResponse.setStatus(status.value());
        httpResponse.setContentType("application/json");
        ObjectMapper objectMapper = new ObjectMapper();
        if (responseBody != null) {
            String responseJson = objectMapper.writeValueAsString(responseBody);
            System.out.println(responseJson + " asta se trimite ca response");
            PrintWriter out = httpResponse.getWriter();
            out.print(responseJson);
            out.flush();
        }
    }

}
