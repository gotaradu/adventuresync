package com.adventuresync.adventuresync.strava.services;

import com.adventuresync.adventuresync.strava.dao.impl.DataForAccessDAOImpl;
import com.adventuresync.adventuresync.strava.exceptions.CookieException;
import com.adventuresync.adventuresync.strava.exceptions.DataForAccessException;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class AuthFilterService implements Filter {

    private String ipAddress;
    private final CookieService cookieService;
    private final TokenService tokenService;

    private final DataForAccessDAOImpl dataForAccessDAO;

    private final StravaLoginService stravaLoginService;

    public AuthFilterService(@Value("${server.address}") String ipAddress, CookieService cookieService, TokenService tokenService, DataForAccessDAOImpl dataForAccessDAO, StravaLoginService stravaLoginService) {
        this.ipAddress = ipAddress;
        this.cookieService = cookieService;
        this.tokenService = tokenService;
        this.dataForAccessDAO = dataForAccessDAO;
        this.stravaLoginService = stravaLoginService;
    }

    public void setHeaders(HttpServletResponse httpResponse) {
        httpResponse.setHeader("Access-Control-Allow-Origin", "http://" + ipAddress + ":3000");
        httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        httpResponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;
        if (httpRequest.getMethod().equalsIgnoreCase("OPTIONS")) {
            setHeaders(httpResponse);
            return;
        }
        if (!httpRequest.getRequestURI().equals("/home") && !httpRequest.getRequestURI().equals("/activities")) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }
        try {
            Optional<String> jwt = cookieService.getJwtCookie("jwt", httpRequest);
            if (jwt.isPresent()) {
                setHeaders(httpResponse);
                if (!tokenService.isExpiredJwt(jwt.get())) {

                    System.out.println("Intra aici");
                    dataForAccessDAO.findByJwtToken(jwt.get());
                    filterChain.doFilter(servletRequest, servletResponse);
                } else {
                    // aici trebuie sa fac rost de refresh token
                    System.out.println("Intra aici 2");
                    stravaLoginService.sentRefreshResponse(httpResponse, jwt.get());
                    filterChain.doFilter(servletRequest, servletResponse);
                }
            } else {
                System.out.println("Intra aici 3");
                httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        } catch (DataForAccessException | CookieException e) {
            System.out.println("Intra aici 4");
            setHeaders(httpResponse);
            httpResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);
        }
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}
