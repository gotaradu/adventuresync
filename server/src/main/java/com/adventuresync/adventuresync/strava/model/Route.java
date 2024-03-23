package com.adventuresync.adventuresync.strava.model;

import jakarta.persistence.*;


@Entity
@Table(name = "route")
public class Route{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;
    @Column(name = "description")
    private String description;
    @Column(name = "distance")
    private float distance;


    public Route() {
    }

    public int getId() {
        return id;
    }

    public Route(String description, float distance) {
        this.description = description;
        this.distance = distance;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getDistance() {
        return distance;
    }

    public void setDistance(float distance) {
        this.distance = distance;
    }

    @Override
    public String toString() {
        return "Route{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", distance=" + distance +
                '}';
    }
}
