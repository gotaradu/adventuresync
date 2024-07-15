package com.adventuresync.adventuresync.strava.dao.impl;

import com.adventuresync.adventuresync.strava.dao.DataForAccessDAO;
import com.adventuresync.adventuresync.strava.exceptions.DataForAccessException;
import com.adventuresync.adventuresync.strava.exceptions.ErrorCode;
import com.adventuresync.adventuresync.strava.model.DataForAccess;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class DataForAccessDAOImpl implements DataForAccessDAO {
    private final EntityManager entityManager;

    @Autowired
    public DataForAccessDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    @Transactional
    public void save(DataForAccess dataForAccess) {
        entityManager.persist(dataForAccess);
    }

    @Override
    @Transactional
    public DataForAccess findByAccessToken(String accessToken) throws DataForAccessException{
        Query query = entityManager.createNativeQuery("Select * from data_for_access WHERE data_for_access.access_token= :accessToken", DataForAccess.class);
        query.setParameter("accessToken", accessToken);
        try {
            return (DataForAccess) query.getSingleResult();
        } catch (NoResultException e) {
            throw new DataForAccessException(ErrorCode.ERR0200, accessToken);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public DataForAccess findByAthleteId(String athleteId) throws DataForAccessException {
        Query query = entityManager.createNativeQuery("Select * from data_for_access WHERE data_for_access.athlete_id= :athleteId", DataForAccess.class);
        query.setParameter("athleteId", athleteId);
        try {
            return (DataForAccess) query.getSingleResult();
        } catch (NoResultException e) {
            throw new DataForAccessException(ErrorCode.ERR0201, athleteId);
        }
    }

    @Override
    @Transactional
    public DataForAccess findByJwtToken(String jwt) throws DataForAccessException{
        System.out.println(jwt);
        Query query = entityManager.createNativeQuery("Select * from data_for_access WHERE data_for_access.json_token= :jwt", DataForAccess.class);
        query.setParameter("jwt", jwt);
        try {
            return (DataForAccess) query.getSingleResult();
        } catch (NoResultException e) {
            throw new DataForAccessException(ErrorCode.ERR0202, jwt);
        }
    }

    @Override
    @Transactional
    public void update(DataForAccess dataForAccess) {
        entityManager.merge(dataForAccess);
    }
}
