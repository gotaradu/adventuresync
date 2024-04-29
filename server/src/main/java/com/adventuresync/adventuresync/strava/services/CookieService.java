package com.adventuresync.adventuresync.strava.services;

import com.adventuresync.adventuresync.strava.exceptions.CookieException;
import com.adventuresync.adventuresync.strava.exceptions.ErrorCode;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class CookieService {
    public Cookie[] getCookies(HttpServletRequest request) {
        return request.getCookies();
    }

    public Optional<String> getJwtCookie(String jwtCookieName, HttpServletRequest request) throws CookieException {
        if (jwtCookieName != null && !jwtCookieName.isEmpty()) {
            Cookie[] cookies = getCookies(request);
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if (cookie.getName().equals(jwtCookieName)) {
                        return Optional.of(cookie.getValue());
                    }
                }
            } else {
                throw new CookieException(ErrorCode.ERR0050);
            }
        }
        throw new CookieException(ErrorCode.ERR0051, jwtCookieName);
    }


    public void attachCookieToResponse(HttpServletResponse response, boolean httpSecured, String jwtToken) {
        Cookie cookie = new Cookie("jwt", jwtToken);
        cookie.setMaxAge(60 * 60 * 24);
        if (httpSecured) cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }
}
