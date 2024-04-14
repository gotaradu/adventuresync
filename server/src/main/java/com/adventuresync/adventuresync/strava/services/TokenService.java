package com.adventuresync.adventuresync.strava.services;

import com.adventuresync.adventuresync.strava.exceptions.DataForAccessException;
import com.adventuresync.adventuresync.strava.exceptions.ErrorCode;
import com.adventuresync.adventuresync.strava.exceptions.JwtException;
import com.adventuresync.adventuresync.strava.model.DataForAccess;
import com.adventuresync.adventuresync.strava.model.JwtToken;
import com.adventuresync.adventuresync.strava.model.StravaToken;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.Date;

@Service
public class TokenService {

    private final RestTemplate restTemplate;
    private final StravaToken stravaToken;

    private final DataForAccessService dataForAccessService;

    @Autowired
    public TokenService(RestTemplate restTemplate, StravaToken stravaToken, DataForAccessService dataForAccessService) {
        this.restTemplate = restTemplate;
        this.stravaToken = stravaToken;
        this.dataForAccessService = dataForAccessService;
    }

    public ResponseEntity<String> getRequiredTokens(String url, String body) throws JsonProcessingException {
        try {
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> request = new HttpEntity<>(body, httpHeaders);
            return restTemplate.postForEntity(url, request, String.class);
        } catch (RestClientException e) {
            throw new JwtException(ErrorCode.ERR0105, body);
        }
    }

    public DataForAccess getDataForAccess(String code, String scope) throws DataForAccessException {
        try {
            String stravaUrl = "https://www.strava.com/api/v3/oauth/token";
            ResponseEntity<String> responseEntity = getRequiredTokens(stravaUrl, stravaToken.composeBodyLogin(scope, code));
            DataForAccess dataForAccess = dataForAccessService.mapData(responseEntity.getBody());
            JwtToken jwtToken = new JwtToken(dataForAccess);
            dataForAccess.setJwtToken(jwtToken.getToken());
            return dataForAccess;
        } catch (JsonProcessingException | JwtException processingException) {
            throw new DataForAccessException(ErrorCode.ERR0210, code + " " + scope);
        }
    }

    public long getExpirationDate(String token) {
        Data jwt = checkJwt(token);
        return jwt.getExpirationDate().toInstant().toEpochMilli();
    }

    public String getAthleteIdFromJwt(String token) {
        Data jwt = checkJwt(token);
        return jwt.getAthleteId();
    }

    private Data checkJwt(String token) {
        try {
            Jws<Claims> data = Jwts.parser().
                    verifyWith(Keys.hmacShaKeyFor(System.getenv("SECRET_KEY").
                            getBytes())).
                    build().
                    parseSignedClaims(token);
            return new Data(data.getPayload().getSubject(), data.getPayload().getExpiration());
        } catch (ExpiredJwtException e) {
            return new Data(e.getClaims().getSubject(), e.getClaims().getExpiration());
        } catch (SignatureException e) {
            throw new JwtException(ErrorCode.ERR0102, token);
        } catch (Exception e) {
            throw new JwtException(ErrorCode.ERR0100, token);
        }
    }

    public DataForAccess getDataForRefresh(String refreshToken, String athleteId) {
        try {
            String stravaUrl = "https://www.strava.com/api/v3/oauth/token";
            ResponseEntity<String> responseEntity = getRequiredTokens(stravaUrl, stravaToken.composeBodyRefresh(refreshToken));
            DataForAccess dataForAccess = dataForAccessService.mapData(responseEntity.getBody());
            JwtToken jwtToken = new JwtToken(dataForAccess, athleteId);
            dataForAccess.setJwtToken(jwtToken.getToken());
            System.out.println(responseEntity);
            return dataForAccess;
        } catch (JsonProcessingException processingException) {
            return new DataForAccess();
        }
    }

    public boolean isExpiredJwt(String jwt) {
        try {
            long date = getExpirationDate(jwt);
            long now = Instant.now().toEpochMilli();
            return now >= date;
        } catch (JwtException e) {
            return true;
        }
    }

    static class Data {
        String athleteId;
        Date expirationDate;

        public Data(String athleteId, Date expirationDate) {
            this.athleteId = athleteId;
            this.expirationDate = expirationDate;
        }

        public String getAthleteId() {
            return athleteId;
        }

        public void setAthleteId(String athleteId) {
            this.athleteId = athleteId;
        }

        public Date getExpirationDate() {
            return expirationDate;
        }

        public void setExpirationDate(Date expirationDate) {
            this.expirationDate = expirationDate;
        }
    }
}
