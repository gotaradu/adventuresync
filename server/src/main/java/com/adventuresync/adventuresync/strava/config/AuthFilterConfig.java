package com.adventuresync.adventuresync.strava.config;

import com.adventuresync.adventuresync.strava.dao.DataForAccessDAOImpl;
import com.adventuresync.adventuresync.strava.services.AuthFilterService;
import com.adventuresync.adventuresync.strava.services.CookieService;
import com.adventuresync.adventuresync.strava.services.StravaLoginService;
import com.adventuresync.adventuresync.strava.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthFilterConfig {


    CookieService cookieService;
    TokenService tokenService;

    DataForAccessDAOImpl dataForAccessDAO;

    StravaLoginService stravaLoginService;

    @Autowired
    public AuthFilterConfig(CookieService cookieService, TokenService tokenService, DataForAccessDAOImpl dataForAccessDAO, StravaLoginService stravaLoginService) {
        this.cookieService = cookieService;
        this.tokenService = tokenService;
        this.dataForAccessDAO = dataForAccessDAO;
        this.stravaLoginService = stravaLoginService;
    }

    @Bean
    public FilterRegistrationBean<AuthFilterService> jwtFilter() {
        FilterRegistrationBean<AuthFilterService> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new AuthFilterService(cookieService, tokenService, dataForAccessDAO, stravaLoginService));
        registrationBean.addUrlPatterns("/home");
        return registrationBean;
    }
}
