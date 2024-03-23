package com.adventuresync.adventuresync.strava.model;


import com.adventuresync.adventuresync.strava.exceptions.DataForAccessException;
import com.adventuresync.adventuresync.strava.exceptions.ErrorCode;
import com.adventuresync.adventuresync.strava.exceptions.SummaryAthleteException;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import org.springframework.http.ResponseEntity;

import java.lang.reflect.Field;

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Table(name = "data_for_access")
public class DataForAccess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @JsonProperty("token_type")
    @Transient
    private String tokenType;

    @JsonProperty("expires_at")
    @Column(name = "expiresAt")
    private long expiresAt;

    @JsonProperty("expires_in")
    @Transient
    private int expiresIn;

    @JsonProperty("refresh_token")
    @Column(name = "refreshToken")
    private String refreshToken;

    @JsonProperty("access_token")
    @Column(name = "accessToken")
    private String accessToken;
    @Column(name = "jsonToken")
    private String jwtToken;

    @JsonProperty("athlete")
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "athlete_id")
    private SummaryAthlete summaryAthlete;

    public DataForAccess() {
    }

    public String getTokenType() {
        return tokenType;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public long getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(long expiresAt) {
        this.expiresAt = expiresAt;
    }

    public int getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(int expiresIn) {
        this.expiresIn = expiresIn;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public SummaryAthlete getSummaryAthlete() {
        return summaryAthlete;
    }

    public void setSummaryAthlete(SummaryAthlete summaryAthlete) {
        this.summaryAthlete = summaryAthlete;
    }


    public void setDataForUpdate(DataForAccess data){
        setAccessToken(data.getAccessToken());
        setJwtToken(data.getJwtToken());
        setExpiresAt(data.getExpiresAt());
        setRefreshToken(data.getRefreshToken());
    }

    @Override
    public String toString() {
        return "DataForAccess{" +
                "tokenType='" + tokenType + '\'' +
                ", expiresAt=" + expiresAt +
                ", expiresIn=" + expiresIn +
                ", refreshToken='" + refreshToken + '\'' +
                ", accessToken='" + accessToken + '\'' +
                ", jwtToken='" + jwtToken + '\'' +
                ", summaryAthlete=" + summaryAthlete +
                '}';
    }
}
