package com.adventuresync.adventuresync.strava.exceptions;

public enum ErrorCode {

    // Athlete & DataForAccess
    ERR001("Athlete saving to database has failed"),
    ERR002("DataForAccess saving to database has failed. Athlete saving is reversed"),
    ERR003("Athlete does not exist in DataForAccessService"),
    ERR004("Athlete saving to database has failed in DataForAccessService"),

    ERR005("Athlete updating in database has failed"),


    // Cookie

    ERR0050("Cookie not found in request to server"),
    ERR0051("Cookie field to search for is null or is empty"),

    ERR0052("Jwt from cookie is expired"),

    // JWT

    ERR0100("Jwt is not correct or it might have been modified outside of environment"),
    ERR0101("Expired Jwt"),
    ERR0102("Signature errors on Jwt"),
    ERR0103("Error when decoding Jwt"),

    ERR0104("Jwt key is invalid"),
    ERR0105("Error in communicating with external Strava service"),


    // Athlete

    ERR0150("Getting athlete from Jwt has failed"),
    ERR0151("Find By athleteId method in SummaryAthleteDao has failed. No result is available in database"),


    // DataForAccess
    ERR0200("Find By accessToken method in DataForAccessDAO has failed. No result is available in database"),
    ERR0201("Find By athleteId method in DataForAccessDAO has failed. No result is available in database"),
    ERR0202("Find By jwtToken method in DataForAccessDAO has failed. No result is available in database"),
    ERR0210("Something went wrong with login, please try again");

    private final String message;

    ErrorCode(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
