package com.adventuresync.adventuresync.strava.exceptions;

import com.adventuresync.adventuresync.strava.model.DataForAccess;

import java.util.logging.Level;
import java.util.logging.Logger;

public class DataForAccessException extends RuntimeException {
    private final ErrorCode errorCode;

    public DataForAccessException(ErrorCode errorCode, String data) {
        this.errorCode = errorCode;
        Logger logger = Logger.getLogger(DataForAccess.class.getName());
        logger.log(Level.SEVERE, errorCode.getMessage(), data);
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}
