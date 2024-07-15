package com.adventuresync.adventuresync.strava.controllers;

import com.adventuresync.adventuresync.strava.model.Activity;
import com.adventuresync.adventuresync.strava.services.StravaActivitiesService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class StravaController {

    private final StravaActivitiesService stravaActivitiesService;

    public StravaController(StravaActivitiesService stravaActivitiesService) {
        this.stravaActivitiesService = stravaActivitiesService;
    }

    @GetMapping("/activities")
    public ResponseEntity<List<Activity>> getAthleteActivities(HttpServletRequest request) {
        try {
            String pageParam = request.getParameter("page");
            System.out.println("page is : " + pageParam);
            int page = Integer.parseInt(pageParam);
            return stravaActivitiesService.getAthleteActivities(request, page);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
