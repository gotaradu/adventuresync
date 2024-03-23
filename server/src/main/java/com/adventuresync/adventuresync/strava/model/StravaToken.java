package com.adventuresync.adventuresync.strava.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;

@Component
public class StravaToken {

    private final ObjectMapper objectMapper;

    private final String clientId;
    private final String clientSecret;
    private String redirectUrl;
    private String code;
    private String scope = "read";

    @Autowired
    public StravaToken() {
        this.objectMapper = new ObjectMapper();
        this.clientId = System.getenv("CLIENT_ID");
        this.clientSecret = System.getenv("CLIENT_SECRET");
    }

    public String getClientId() {
        return clientId;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public void setData(String scope, String code){
        setScope(scope);
        setCode(code);
    }



    public String composeBodyLogin(String scope, String code) throws JsonProcessingException {
        setData(scope,code);
        LinkedHashMap<String, String> body = new LinkedHashMap<>();
        body.put("client_id", this.getClientId());
        body.put("client_secret", this.getClientSecret());
        body.put("code", this.getCode());
        body.put("grant_type", "authorization_code");
        return objectMapper.writeValueAsString(body);
    }

    public String composeBodyRefresh(String refreshToken) throws JsonProcessingException{
        LinkedHashMap<String, String> body = new LinkedHashMap<>();
        body.put("client_id",this.getClientId());
        body.put("client_secret", this.getClientSecret());
        body.put("grant_type", "refresh_token");
        body.put("refresh_token", refreshToken);
        return objectMapper.writeValueAsString(body);
    }

}
