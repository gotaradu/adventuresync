package com.adventuresync.adventuresync.strava.services;

import com.adventuresync.adventuresync.strava.model.Activity;
import com.adventuresync.adventuresync.strava.model.ApiActivity;
import com.adventuresync.adventuresync.strava.model.DataForAccess;
import com.adventuresync.adventuresync.strava.utils.ApiConverter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class StravaActivitiesService {

    private final RestTemplate restTemplate;
    private final CookieService cookieService;
    private final DataForAccessService dataForAccessService;

    public StravaActivitiesService(RestTemplate restTemplate, CookieService cookieService, DataForAccessService dataForAccessService) {
        this.restTemplate = restTemplate;
        this.cookieService = cookieService;
        this.dataForAccessService = dataForAccessService;
    }

    public ResponseEntity<List<Activity>> getAthleteActivities(HttpServletRequest request, @RequestParam int page) throws JsonProcessingException {
        System.out.println(page);
        System.out.println("PAge is called again !!!!!!!!!!!!!!!");
        try {
            Optional<String> jwtCookie = cookieService.getJwtCookie("jwt", request);
            if (jwtCookie.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            Date date = new Date();
            String API_URL = "https://www.strava.com/api/v3/athlete/activities?before=" + date.getTime() / 1000 + "&after=56&page=";


            //get data based on jwt
            DataForAccess data = dataForAccessService.getDataFromToken(jwtCookie.get());
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + data.getAccessToken());

            HttpEntity<String> entity = new HttpEntity<>(headers);
            String apiUrl = API_URL +
                    "&page=" + page +
                    "&per_page=50";

            ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, String.class);


            if (response.getStatusCode().is2xxSuccessful()) {
                ObjectMapper objectMapper = new ObjectMapper();
                String responseBody = response.getBody();
                if (responseBody != null) {
                    List<ApiActivity> apiActivities = new ArrayList<>(List.of(objectMapper.readValue(responseBody, ApiActivity[].class)));

                    List<Activity> activities = new ArrayList<>();
                    for (ApiActivity apiActivity : apiActivities) {

                        Activity activity = ApiConverter.apiActivityConverter((apiActivity));
                        activities.add(activity);
                        System.out.println(activity);
                    }

                    return ResponseEntity.ok(activities);
                }
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
}

