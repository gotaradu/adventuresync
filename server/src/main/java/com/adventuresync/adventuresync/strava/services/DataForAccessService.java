package com.adventuresync.adventuresync.strava.services;

import com.adventuresync.adventuresync.strava.dao.DataForAccessDAOImpl;
import com.adventuresync.adventuresync.strava.dao.SummaryAthleteDAOImpl;
import com.adventuresync.adventuresync.strava.exceptions.DataForAccessException;
import com.adventuresync.adventuresync.strava.exceptions.ErrorCode;
import com.adventuresync.adventuresync.strava.exceptions.SummaryAthleteException;
import com.adventuresync.adventuresync.strava.model.DataForAccess;
import com.adventuresync.adventuresync.strava.model.SummaryAthlete;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.time.Instant;


@Service
@Transactional
public class DataForAccessService {

    private final DataForAccessDAOImpl dataForAccessDAO;
    private final SummaryAthleteDAOImpl summaryAthleteDAO;


    @Autowired
    public DataForAccessService(DataForAccessDAOImpl dataForAccessDAO, SummaryAthleteDAOImpl summaryAthleteDAO) {
        this.summaryAthleteDAO = summaryAthleteDAO;
        this.dataForAccessDAO = dataForAccessDAO;
    }

    public DataForAccess mapData(String responseEntity) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(responseEntity, DataForAccess.class);
    }

    public boolean isExpiresAtValid(DataForAccess dataForAccess) {
        return dataForAccess.getExpiresAt() > Instant.now().getEpochSecond();
    }

    public DataForAccess getDataFromToken(String jwt) {
        return dataForAccessDAO.findByJwtToken(jwt);
    }

    @Transactional
    public void updateData(DataForAccess data) {
        try {
            SummaryAthlete a = summaryAthleteDAO.findById(data.getSummaryAthlete().getId());
            DataForAccess d = dataForAccessDAO.findByAthleteId(data.getSummaryAthlete().getId());
            a.setAllFieldsExceptId(data.getSummaryAthlete());
            summaryAthleteDAO.update(a);
            d.setDataForUpdate(data);
            d.setSummaryAthlete(a);
            dataForAccessDAO.update(d);
        } catch (SummaryAthleteException e) {
            throw new SummaryAthleteException(ErrorCode.ERR004, data.getSummaryAthlete().toString());
        } catch (DataForAccessException e) {
            throw new DataForAccessException(ErrorCode.ERR003, data.getSummaryAthlete().toString());
        } catch (HibernateException error) {
            throw new DataForAccessException(ErrorCode.ERR002, data.getSummaryAthlete().toString());
        }
    }


    @Transactional
    public void persistDataForAccess(DataForAccess data) {
        try {
            updateData(data);
        } catch (DataForAccessException e) {
            dataForAccessDAO.save(data);
        } catch (HibernateException error) {
            throw new DataForAccessException(ErrorCode.ERR002, data.getSummaryAthlete().toString());
        }
    }

}