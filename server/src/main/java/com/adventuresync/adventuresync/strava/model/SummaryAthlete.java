package com.adventuresync.adventuresync.strava.model;


import com.adventuresync.adventuresync.strava.exceptions.ErrorCode;
import com.adventuresync.adventuresync.strava.exceptions.SummaryAthleteException;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.lang.reflect.Field;

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Table(name = "athlete")
public class SummaryAthlete {
    @Id
    @Column(name = "id")
    private String id;

    @JsonProperty("resource_state")
    @Transient
    private int resourceState;
    @JsonProperty("firstname")
    @Column(name = "firstname")
    private String firstName;
    @JsonProperty("lastname")
    @Column(name = "lastname")
    private String lastName;
    @Transient
    private String profile;
    @Transient
    private String city;
    @Transient
    private String state;

    @Column(name = "country")
    private String country;

    @Column(name = "sex")
    private String sex;
    @JsonProperty("created_at")
    @Transient
    private String createdAt;
    @JsonProperty("updated_at")
    @Transient
    private String updatedAt;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getResourceState() {
        return resourceState;
    }

    public void setResourceState(int resourceState) {
        this.resourceState = resourceState;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setAllFieldsExceptId(SummaryAthlete summaryAthlete) {
        setFirstName(summaryAthlete.getFirstName());
        setLastName(summaryAthlete.getLastName());
        setCountry(summaryAthlete.getCountry());
        setSex(summaryAthlete.getSex());
    }

    @Override
    public String toString() {
        return "SummaryAthlete{" +
                "id='" + id + '\'' +
                ", resourceState=" + resourceState +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", profile='" + profile + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", sex='" + sex + '\'' +
                ", createdAt='" + createdAt + '\'' +
                ", updatedAt='" + updatedAt + '\'' +
                '}';
    }
}
