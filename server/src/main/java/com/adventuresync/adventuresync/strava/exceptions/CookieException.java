package com.adventuresync.adventuresync.strava.exceptions;

import com.adventuresync.adventuresync.strava.model.DataForAccess;

import java.util.logging.Level;
import java.util.logging.Logger;

public class CookieException extends RuntimeException{

    private final ErrorCode errorCode;

    public CookieException(ErrorCode errorCode, String data) {
        this.errorCode = errorCode;
        Logger logger = Logger.getLogger(DataForAccess.class.getName());
        logger.log(Level.SEVERE, errorCode.getMessage(), data);
    }
    public CookieException(ErrorCode errorCode) {
        this(errorCode, "No data to show, maybe cookies are null");
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}

