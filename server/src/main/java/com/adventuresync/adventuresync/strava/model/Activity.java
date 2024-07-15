package com.adventuresync.adventuresync.strava.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Activity(
        long id,
//        @JsonProperty("external_id") String externalId,
//        @JsonProperty("upload_id") long uploadId,
        MetaAthlete athlete,
        String name,
        float distance,
        @JsonProperty("average_heartrate") float averageHeartrate,
        @JsonProperty("moving_time") int movingTime,
        @JsonProperty("elapsed_time") int elapsedTime,
        @JsonProperty("total_elevation_gain") float totalElevationGain,
        @JsonProperty("elev_high") float elevHigh,
        @JsonProperty("elev_low") float elevLow,
        String type,
        @JsonProperty("sport_type") SportType sportType,
        @JsonProperty("start_date") Date startDate,
        @JsonProperty("start_date_local") Date startDateLocal,
        String timezone,
        @JsonProperty("start_latlng") float[] startLatlng,
        @JsonProperty("end_latlng") float[] endLatlng,
//        @JsonProperty("achievement_count") int achievementCount,
        @JsonProperty("athlete_count") int athleteCount,
        PolylineMap map,
//        boolean trainer,
//        boolean _private,
//        boolean flagged,
//        @JsonProperty("workout_type") int workoutType,
//        @JsonProperty("upload_id_str") String uploadIdStr,
        @JsonProperty("average_speed") float averageSpeed,
        @JsonProperty("max_speed") float maxSpeed,
        float kilojoules,
        @JsonProperty("average_watts") float averageWatts,
        @JsonProperty("device_watts") boolean deviceWatts,
        @JsonProperty("max_watts") int maxWatts,
        @JsonProperty("weighted_average_watts") int weightedAverageWatts
) {
}