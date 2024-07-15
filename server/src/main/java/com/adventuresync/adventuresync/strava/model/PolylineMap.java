package com.adventuresync.adventuresync.strava.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PolylineMap(@JsonProperty("summary_polyline") String polyline) {
}

