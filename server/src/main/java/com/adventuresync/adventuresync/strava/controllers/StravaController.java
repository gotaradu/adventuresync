package com.adventuresync.adventuresync.strava.controllers;

import com.adventuresync.adventuresync.strava.services.StravaActivitiesService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;



@RestController
public class StravaController {

    private final StravaActivitiesService stravaActivitiesService;

    public StravaController(StravaActivitiesService stravaActivitiesService) {
        this.stravaActivitiesService = stravaActivitiesService;
    }

    @GetMapping("/activities")
    public ResponseEntity<String> getAthleteActivities(HttpServletRequest request) {
        return stravaActivitiesService.getAthleteActivities(request);
    }
}
