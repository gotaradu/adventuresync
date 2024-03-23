package com.adventuresync.adventuresync.strava.dao;

import com.adventuresync.adventuresync.strava.model.DataForAccess;
import org.springframework.data.repository.query.Param;

public interface DataForAccessDAO {
    void save(DataForAccess dataForAccess);

    DataForAccess findByAccessToken(@Param("accessToken") String accessToken);

    public DataForAccess findByAthleteId(@Param("athleteId") String athleteId);

    public DataForAccess findByJwtToken(@Param("jwt") String jwt);

    public void update(DataForAccess dataForAccess);
}
