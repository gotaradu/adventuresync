package com.adventuresync.adventuresync.strava.config;

import com.adventuresync.adventuresync.strava.dao.impl.DataForAccessDAOImpl;
import com.adventuresync.adventuresync.strava.services.AuthFilterService;
import com.adventuresync.adventuresync.strava.services.CookieService;
import com.adventuresync.adventuresync.strava.services.StravaLoginService;
import com.adventuresync.adventuresync.strava.services.TokenService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthFilterConfig {
    private String ipAddress;
    private final CookieService cookieService;
    private final TokenService tokenService;
    private final DataForAccessDAOImpl dataForAccessDAO;
    private final StravaLoginService stravaLoginService;


    public AuthFilterConfig(@Value("${server.address}") String ipAddress, CookieService cookieService, TokenService tokenService, DataForAccessDAOImpl dataForAccessDAO, StravaLoginService stravaLoginService) {
        this.ipAddress = ipAddress;
        this.cookieService = cookieService;
        this.tokenService = tokenService;
        this.dataForAccessDAO = dataForAccessDAO;
        this.stravaLoginService = stravaLoginService;
    }

    @Bean
    public FilterRegistrationBean<AuthFilterService> jwtFilter() {
        FilterRegistrationBean<AuthFilterService> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new AuthFilterService(ipAddress, cookieService, tokenService, dataForAccessDAO, stravaLoginService));
        registrationBean.addUrlPatterns("/home");
        return registrationBean;
    }
}
