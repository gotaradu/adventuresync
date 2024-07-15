package com.adventuresync.adventuresync.strava.controllers;

import com.adventuresync.adventuresync.strava.exceptions.CookieException;
import com.adventuresync.adventuresync.strava.exceptions.JwtException;
import com.adventuresync.adventuresync.strava.model.ApiResponse;
import com.adventuresync.adventuresync.strava.services.StravaLoginService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.servlet.view.RedirectView;

@CrossOrigin(origins = "http://${server.address}:3000")
@RestController
public class AuthController {

    private final StravaLoginService stravaLoginService;


    public AuthController(StravaLoginService stravaLoginService) {
        this.stravaLoginService = stravaLoginService;
    }

    @GetMapping("/home")
    public ResponseEntity<ApiResponse> checkLoggedIn(HttpServletRequest request) {
        try {
            return new ResponseEntity<>(new ApiResponse(stravaLoginService.getAthleteFromJwt(request)), HttpStatus.OK);
        } catch (CookieException e) {
            return new ResponseEntity<>(new ApiResponse(stravaLoginService.getAthleteFromJwt(request), e.getMessage()), HttpStatus.FORBIDDEN);
        } catch (JwtException e) {
            return new ResponseEntity<>(new ApiResponse(stravaLoginService.getAthleteFromJwt(request), e.getMessage()), HttpStatus.UNAUTHORIZED);
        }
    }


    @GetMapping("/exchange_token")
    public RedirectView getRequestParamsForLogin(@RequestParam String code, @RequestParam String scope, HttpServletResponse response) {
        return stravaLoginService.loginWithStrava(code, scope, response);
    }

}
