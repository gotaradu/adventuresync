package com.adventuresync.adventuresync.strava.controllers;


import com.adventuresync.adventuresync.strava.exceptions.CookieException;
import com.adventuresync.adventuresync.strava.exceptions.JwtException;
import com.adventuresync.adventuresync.strava.model.SummaryAthlete;
import com.adventuresync.adventuresync.strava.services.StravaLoginService;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.servlet.view.RedirectView;

@CrossOrigin(origins = "http://192.168.2.208:3000")
@RestController
public class AuthController {

    private final StravaLoginService stravaLoginService;

    @Autowired
    public AuthController(StravaLoginService stravaLoginService) {
        this.stravaLoginService = stravaLoginService;
    }

    @GetMapping("/home")
    public ResponseEntity<SummaryAthlete> checkLoggedIn(HttpServletRequest request) {
        try {
            return new ResponseEntity<>(stravaLoginService.getAthleteFromJwt(request), HttpStatus.OK);
        } catch (CookieException | JwtException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/exchange_token")
    public RedirectView getRequestParamsForLogin(@RequestParam String code, @RequestParam String scope, HttpServletResponse response) {
        return stravaLoginService.loginWithStrava(code, scope, response);
    }

}
