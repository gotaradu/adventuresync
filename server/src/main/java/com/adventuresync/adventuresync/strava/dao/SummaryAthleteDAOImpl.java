package com.adventuresync.adventuresync.strava.dao;

import com.adventuresync.adventuresync.strava.exceptions.DataForAccessException;
import com.adventuresync.adventuresync.strava.exceptions.ErrorCode;
import com.adventuresync.adventuresync.strava.exceptions.SummaryAthleteException;
import com.adventuresync.adventuresync.strava.model.DataForAccess;
import com.adventuresync.adventuresync.strava.model.SummaryAthlete;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class SummaryAthleteDAOImpl implements SummaryAthleteDAO {

    private final EntityManager entityManager;

    @Autowired
    public SummaryAthleteDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public SummaryAthlete findById(String id) {
        return entityManager.find(SummaryAthlete.class, id);
    }

    @Override
    @Transactional
    public void save(SummaryAthlete summaryAthlete) {
        entityManager.persist(summaryAthlete);
    }

    @Override
    @Transactional
    public void update(SummaryAthlete summaryAthlete) {
        entityManager.merge(summaryAthlete);
    }
}
