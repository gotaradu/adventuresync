package com.adventuresync.adventuresync.strava.services;

import com.adventuresync.adventuresync.strava.model.Activity;
import com.adventuresync.adventuresync.strava.model.DataForAccess;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
            //  System.out.println(response);

            if (response.getStatusCode().is2xxSuccessful()) {
                ObjectMapper objectMapper = new ObjectMapper();
                String responseBody = response.getBody();
                if (responseBody != null) {
                    List<Activity> allActivities = new ArrayList<>(List.of(objectMapper.readValue(responseBody, Activity[].class)));
                    for(Activity activity :  allActivities){
                        System.out.println(activity.distance());
                        System.out.println("-------------------------------");
                    }
                    return ResponseEntity.ok(allActivities);
                }
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

//    public List<String> getAllAthleteActvities(HttpServletRequest request) throws JsonProcessingException {
//        List<String> allActivities = new ArrayList<>();
//        int page = 1;
//        boolean hasMoreActivities = true;
//
//        while (hasMoreActivities) {
//            ResponseEntity<String> response = getAthleteActivities(request, page);
//            if (response.getStatusCode().is2xxSuccessful()) {
//                String responseBody = response.getBody();
//                allActivities.add(responseBody);
//                // Decide criteria to determine if there are more pages to fetch
//                hasMoreActivities = hasMoreActivities(responseBody); // Implement this method
//                page++;
//            } else {
//                // Handle error case
//                hasMoreActivities = false; // Or retry logic
//            }
//        }
//
//        return allActivities;
//    }

//    private boolean hasMoreActivities(String responseBody) {
//        // Implement logic to determine if there are more pages to fetch
//        // For example, check if the response contains activities or any specific criteria from API
//        // You may need to parse the JSON response to determine this
//        // For simplicity, you can implement a basic check based on the size of the list or array
//        // If the response contains an array of activities, you can assume there are more pages if the array is not empty
//        return true; // Replace with actual logic
//    }
}
