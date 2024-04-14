package com.adventuresync.adventuresync.strava.model;

import com.adventuresync.adventuresync.strava.exceptions.ErrorCode;
import com.adventuresync.adventuresync.strava.exceptions.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.InvalidKeyException;
import io.jsonwebtoken.security.Keys;


import javax.crypto.SecretKey;


import java.util.Date;


public class JwtToken {

    String token;


    public JwtToken(DataForAccess dataForAccess) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(System.getenv("SECRET_KEY").getBytes());
            this.token = Jwts.builder()
                    .subject(dataForAccess.getSummaryAthlete().getId())
                    .claim("role", "user")
                    .signWith(key).expiration(new Date(dataForAccess.getExpiresAt() * 1000))
                    .compact();

        } catch (InvalidKeyException keyException) {
            throw new JwtException(ErrorCode.ERR0100, dataForAccess.getSummaryAthlete().getId());
        }
    }

    public JwtToken(DataForAccess dataForAccess, String athleteId) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(System.getenv("SECRET_KEY").getBytes());
            System.out.println(new Date(dataForAccess.getExpiresAt() * 1000));

            this.token = Jwts.builder()
                    .subject(athleteId)
                    .claim("role", "user")
                    .signWith(key).expiration(new Date(dataForAccess.getExpiresAt() * 1000))
                    .compact();

        } catch (InvalidKeyException keyException) {
            throw new InvalidKeyException("s");
        }
    }


    public String getToken() {
        return token;
    }
}
