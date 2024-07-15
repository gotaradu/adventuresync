package com.adventuresync.adventuresync.strava.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record MetaAthlete(long id) {

}
