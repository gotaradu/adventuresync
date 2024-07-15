package com.adventuresync.adventuresync.strava.dao.impl;

import com.adventuresync.adventuresync.strava.dao.RouteDAO;
import com.adventuresync.adventuresync.strava.model.Route;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
@Repository
public class RouteDAOImpl implements RouteDAO {

    private EntityManager entityManager;

    @Autowired
    public RouteDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Route route) {
        entityManager.persist(route);
    }
}
