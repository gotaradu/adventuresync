package com.adventuresync.adventuresync.strava.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${server.address}")
    private String ipAddress;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/home")
                .allowedOriginPatterns(ipAddress)
                .allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS", "TRACE", "HEAD")
                .allowedHeaders("Content-Type", "Access-Control-Allow-Headers", "Origin", "Accept", "Access-Control-Request-Headers", "Access-Control-Request-Method", "X-Requested-With")
                .allowCredentials(true);
    }
}
