package com.adventuresync.adventuresync.strava.utils;

import com.adventuresync.adventuresync.strava.model.Activity;
import com.adventuresync.adventuresync.strava.model.ApiActivity;

public class ApiConverter {
    public static Activity apiActivityConverter(ApiActivity apiActivity) {
        Activity activity = new Activity();
        activity.setId(apiActivity.id());
        activity.setAthleteId((apiActivity.athlete().id()));
        activity.setName(apiActivity.name());
        activity.setMap(apiActivity.map().polyline());
        activity.setDistance(apiActivity.distance());
        activity.setAverageSpeed(apiActivity.averageSpeed());
        activity.setSportType(apiActivity.sportType());
        activity.setStartDate(apiActivity.startDate());
        activity.setAverageHeartRate(apiActivity.averageHeartrate());
        activity.setMaxHeartRate(apiActivity.maxHeartRate());
        activity.setElapsedTime(apiActivity.elapsedTime());
        activity.setTotalElevationGain(apiActivity.totalElevationGain());
        activity.setElevHigh(apiActivity.elevHigh());
        activity.setElevLow(apiActivity.elevLow());
        activity.setStartLatLng(apiActivity.startLatLng());
        return activity;
    }

}
