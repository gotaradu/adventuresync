package com.adventuresync.adventuresync.strava.controllers;

import com.adventuresync.adventuresync.strava.exceptions.CookieException;
import com.adventuresync.adventuresync.strava.exceptions.JwtException;
import com.adventuresync.adventuresync.strava.model.ApiResponse;
import com.adventuresync.adventuresync.strava.services.StravaLoginService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
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
    private String ipAddress;

    public AuthController(StravaLoginService stravaLoginService, @Value("${server.address}") String ipAddress) {
        this.stravaLoginService = stravaLoginService;
        this.ipAddress = ipAddress;
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
    public RedirectView getRequestParamsForLogin(@RequestParam(required = false) String code, @RequestParam(required = false) String scope, @RequestParam(required = false) String state,
                                                 @RequestParam(required = false) String error, HttpServletResponse response) {
        if (error != null) {
            System.out.println("Error: " + error);

            RedirectView redirectView = new RedirectView("http://" + ipAddress + ":3000/error");
            redirectView.addStaticAttribute("error", error);
            return redirectView;
        }
        if (code != null && scope != null) {
            System.out.println(code + " code");
            return stravaLoginService.loginWithStrava(code, scope, response);
        }

        RedirectView redirectView = new RedirectView("http://" + ipAddress + ":3000/error");
        redirectView.addStaticAttribute("error", "Missing parameters");
        return redirectView;

    }
}
