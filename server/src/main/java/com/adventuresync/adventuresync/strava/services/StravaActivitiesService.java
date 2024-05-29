package com.adventuresync.adventuresync.strava.services;

import com.adventuresync.adventuresync.strava.model.DataForAccess;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

@Service
public class StravaActivitiesService {

    private final RestTemplate restTemplate;
    private final CookieService cookieService;
    private final TokenService tokenService;
    private final DataForAccessService dataForAccessService;

    public StravaActivitiesService(RestTemplate restTemplate, CookieService cookieService, TokenService tokenService, DataForAccessService dataForAccessService) {
        this.restTemplate = restTemplate;
        this.cookieService = cookieService;
        this.tokenService = tokenService;
        this.dataForAccessService = dataForAccessService;
    }

    public ResponseEntity<String> getAthleteActivities(HttpServletRequest request) {
        Date date = new Date();
        String API_URL = "https://www.strava.com/api/v3/athlete/activities?before=" + date.getTime() / 1000 + "&after=56&page=1&per_page=80";
        // get cookie from response
        Optional<String> jwtCookie = cookieService.getJwtCookie("jwt", request);
        //get data based on jwt
        DataForAccess data = dataForAccessService.getDataFromToken(jwtCookie.get());
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + data.getAccessToken());

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.GET, entity, String.class);
        return response;
    }
}
