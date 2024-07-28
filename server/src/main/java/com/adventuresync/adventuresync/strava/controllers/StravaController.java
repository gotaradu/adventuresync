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
    public ResponseEntity<List<Activity>> getAthleteActivities(HttpServletRequest request, @RequestParam("page") int page) {
        try {
            return stravaActivitiesService.getAthleteActivities(request, page);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/activities/activity")
    public ResponseEntity<Activity> getActivityId(HttpServletRequest request, @RequestParam("activityId") String activityId) {
        System.out.println(activityId);
        try {
            return stravaActivitiesService.getActivity(request, activityId);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/activities/stream/activity")
    public ResponseEntity<String> getActivityStream(HttpServletRequest request, @RequestParam("activityId") String activityId) {
        System.out.println(activityId);
        try {
            return stravaActivitiesService.getAltitudeStream(request, activityId);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
