package com.adventuresync.adventuresync.strava.model;

public class ApiResponse {
    private SummaryAthlete athlete;
    private String message;

    public ApiResponse(SummaryAthlete athlete) {
        this.athlete = athlete;
    }

    public ApiResponse(SummaryAthlete athlete, String message) {
        this(athlete);
        this.message = message;
    }

    public SummaryAthlete getData() {
        return athlete;
    }

    public void setData(SummaryAthlete athlete) {
        this.athlete = athlete;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
