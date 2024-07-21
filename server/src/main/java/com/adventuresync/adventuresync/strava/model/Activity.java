package com.adventuresync.adventuresync.strava.model;

import java.util.Arrays;
import java.util.Date;


public class Activity {
    private String id;
    private String athleteId;
    private String name;
    private float distance;
    private float averageHeartRate;
    private float maxHeartRate;
    private int elapsedTime;
    private float totalElevationGain;
    private float elevHigh;
    private float elevLow;
    private String type;
    private SportType sportType;
    private Date startDate;
    private Date startDateLocal;
    private String timezone;
    private float[] startLatLng;
    private float[] endLatLng;
    private int athleteCount;
    private String map;
    private float averageSpeed;
    private float maxSpeed;
    private float kilojoules;
    private float averageWatts;
    private boolean deviceWatts;
    private int maxWatts;

    public String getId() {
        return id;
    }

    public String getAthleteId() {
        return athleteId;
    }

    public String getName() {
        return name;
    }

    public float getDistance() {
        return distance;
    }

    public float getAverageHeartRate() {
        return averageHeartRate;
    }

    public float getMaxHeartRate() {
        return maxHeartRate;
    }

    public int getElapsedTime() {
        return elapsedTime;
    }

    public float getTotalElevationGain() {
        return totalElevationGain;
    }

    public float getElevHigh() {
        return elevHigh;
    }

    public float getElevLow() {
        return elevLow;
    }

    public String getType() {
        return type;
    }

    public SportType getSportType() {
        return sportType;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getStartDateLocal() {
        return startDateLocal;
    }

    public String getTimezone() {
        return timezone;
    }

    public float[] getStartLatLng() {
        return startLatLng;
    }

    public float[] getEndLatLng() {
        return endLatLng;
    }

    public int getAthleteCount() {
        return athleteCount;
    }

    public String getMap() {
        return map;
    }

    public float getAverageSpeed() {
        return averageSpeed;
    }

    public float getMaxSpeed() {
        return maxSpeed;
    }

    public float getKilojoules() {
        return kilojoules;
    }

    public float getAverageWatts() {
        return averageWatts;
    }

    public boolean isDeviceWatts() {
        return deviceWatts;
    }

    public int getMaxWatts() {
        return maxWatts;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setAthleteId(String athleteId) {
        this.athleteId = athleteId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDistance(float distance) {
        this.distance = distance;
    }

    public void setAverageHeartRate(float averageHeartRate) {
        this.averageHeartRate = averageHeartRate;
    }

    public void setMaxHeartRate(float maxHeartRate) {
        this.maxHeartRate = maxHeartRate;
    }

    public void setElapsedTime(int elapsedTime) {
        this.elapsedTime = elapsedTime;
    }

    public void setTotalElevationGain(float totalElevationGain) {
        this.totalElevationGain = totalElevationGain;
    }

    public void setElevHigh(float elevHigh) {
        this.elevHigh = elevHigh;
    }

    public void setElevLow(float elevLow) {
        this.elevLow = elevLow;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setSportType(SportType sportType) {
        this.sportType = sportType;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public void setStartDateLocal(Date startDateLocal) {
        this.startDateLocal = startDateLocal;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public void setStartLatLng(float[] startLatLng) {
        this.startLatLng = startLatLng;
    }

    public void setEndLatlng(float[] endLatLng) {
        this.endLatLng = endLatLng;
    }

    public void setAthleteCount(int athleteCount) {
        this.athleteCount = athleteCount;
    }

    public void setMap(String map) {
        this.map = map;
    }

    public void setAverageSpeed(float averageSpeed) {
        this.averageSpeed = averageSpeed;
    }

    public void setMaxSpeed(float maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    public void setKilojoules(float kilojoules) {
        this.kilojoules = kilojoules;
    }

    public void setAverageWatts(float averageWatts) {
        this.averageWatts = averageWatts;
    }

    public void setDeviceWatts(boolean deviceWatts) {
        this.deviceWatts = deviceWatts;
    }

    public void setMaxWatts(int maxWatts) {
        this.maxWatts = maxWatts;
    }
    // double \ as toString() method only shows 1
    private String setForToString(String map) {
        return map.replace("\\", "\\\\");
    }

    @Override
    public String toString() {
        return "{" +
                "id:'" + id + '\'' +
                ", athleteId:'" + athleteId + '\'' +
                ", name:'" + name + '\'' +
                ", distance:" + distance +
                ", averageHeartRate:" + averageHeartRate +
                ", maxHeartRate:" + maxHeartRate +
                ", elapsedTime:" + elapsedTime +
                ", totalElevationGain:" + totalElevationGain +
                ", elevHigh:" + elevHigh +
                ", elevLow:" + elevLow +
                ", type:'" + type + '\'' +
                ", sportType:'" + sportType + '\'' +
                ", startDate:'" + startDate + '\'' +
                ", startDateLocal:'" + startDateLocal + '\'' +
                ", timezone:'" + timezone + '\'' +
                ", startLatLng:" + Arrays.toString(startLatLng) +
                ", endLatLng:" + Arrays.toString(endLatLng) +
                ", athleteCount:" + athleteCount +
                ", map:'" + setForToString(map) + "'" +
                ", averageSpeed:" + averageSpeed +
                ", maxSpeed:" + maxSpeed +
                ", kilojoules:" + kilojoules +
                ", averageWatts:" + averageWatts +
                ", deviceWatts:" + deviceWatts +
                ", maxWatts:" + maxWatts +
                "},";
    }
}
