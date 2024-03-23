package com.adventuresync.adventuresync.strava.config;

import com.adventuresync.adventuresync.strava.model.StravaToken;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppConfig {


    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public StravaToken tokenComponent() {
        return new StravaToken();
    }
}
