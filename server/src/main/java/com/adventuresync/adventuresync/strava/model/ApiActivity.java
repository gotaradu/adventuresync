package com.adventuresync.adventuresync.strava.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Arrays;
import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ApiActivity(
        String id,
        MetaAthlete athlete,
        String name,
        float distance,
        @JsonProperty("average_heartrate") float averageHeartrate,
        @JsonProperty("max_heartrate") float maxHeartRate,
        @JsonProperty("elapsed_time") int elapsedTime,
        @JsonProperty("total_elevation_gain") float totalElevationGain,
        @JsonProperty("elev_high") float elevHigh,
        @JsonProperty("elev_low") float elevLow,
        String type,
        @JsonProperty("sport_type") SportType sportType,
        @JsonProperty("start_date") Date startDate,
        @JsonProperty("start_date_local") Date startDateLocal,
        String timezone,
        @JsonProperty("start_latlng") float[] startLatLng,
        @JsonProperty("end_latlng") float[] endLatLng,
        @JsonProperty("athlete_count") int athleteCount,
        PolylineMap map,
        @JsonProperty("average_speed") float averageSpeed,
        @JsonProperty("max_speed") float maxSpeed,
        float kilojoules,
        @JsonProperty("average_watts") float averageWatts,
        @JsonProperty("device_watts") boolean deviceWatts,
        @JsonProperty("max_watts") int maxWatts
) {
    @Override
    public String toString() {
        return "{" +
                "id:'" + id + '\'' +
                ", name:'" + name + '\'' +
                ", athlete:" + athlete.id() +
                ", distance:" + distance +
                ", averageHeartrate:" + averageHeartrate +
                ", elapsedTime:" + elapsedTime +
                ", totalElevationGain:" + totalElevationGain +
                ", elevHigh:" + elevHigh +
                ", elevLow:" + elevLow +
                ", type:'" + type + '\'' +
                ", sportType:" + "'" + sportType + "'" +
                ", startDate:" + "'" + startDate + "'" +
                ", startDateLocal:" + "'" + startDateLocal + "'" +
                ", timezone:'" + timezone + '\'' +
                ", startLatLng:" + Arrays.toString(startLatLng) +
                ", endLatLng:" + Arrays.toString(endLatLng) +
                ", athleteCount:" + athleteCount +
                ", map:" + "'" + map.polyline() + "'" +
                ", averageSpeed:" + averageSpeed +
                ", maxSpeed:" + maxSpeed +
                ", kilojoules:" + kilojoules +
                ", averageWatts:" + averageWatts +
                ", deviceWatts:" + deviceWatts +
                ", maxWatts:" + maxWatts +
                "},";
    }
}