package com.adventuresync.adventuresync.strava.dao;

import com.adventuresync.adventuresync.strava.model.SummaryAthlete;

public interface SummaryAthleteDAO {

    SummaryAthlete findById(String id);
    void save(SummaryAthlete summaryAthlete);

    void update(SummaryAthlete summaryAthlete);
}
