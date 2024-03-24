package com.adventuresync.adventuresync.strava.services;

import com.adventuresync.adventuresync.strava.dao.SummaryAthleteDAOImpl;
import com.adventuresync.adventuresync.strava.exceptions.ErrorCode;
import com.adventuresync.adventuresync.strava.exceptions.SummaryAthleteException;
import com.adventuresync.adventuresync.strava.model.SummaryAthlete;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AthleteService {

    private final SummaryAthleteDAOImpl summaryAthleteDAO;

    @Autowired
    public AthleteService(SummaryAthleteDAOImpl summaryAthleteDAO) {
        this.summaryAthleteDAO = summaryAthleteDAO;
    }

    public boolean isValidId(SummaryAthlete summaryAthlete) {
        return summaryAthlete.getId() != null;
    }

    @Transactional
    public void saveAthlete(SummaryAthlete summaryAthlete) throws SummaryAthleteException {
        if (isValidId(summaryAthlete)) {
            try {
                SummaryAthlete existingSummaryAthlete = summaryAthleteDAO.findById(summaryAthlete.getId());
                if (existingSummaryAthlete != null) {
                    existingSummaryAthlete.setAllFieldsExceptId(summaryAthlete);
                    updateAthlete(existingSummaryAthlete);
                } else {
                    summaryAthleteDAO.save(summaryAthlete);
                }
            } catch (HibernateException e) {
                throw new SummaryAthleteException(ErrorCode.ERR001, summaryAthlete.toString());
            }
        } else {
            throw new SummaryAthleteException(ErrorCode.ERR001, summaryAthlete.getId());
        }
    }


    public void updateAthlete(SummaryAthlete updatedSummaryAthlete) throws SummaryAthleteException {
        SummaryAthlete summaryAthlete = summaryAthleteDAO.findById(updatedSummaryAthlete.getId());
        if (summaryAthlete != null && summaryAthlete.getId() != null) {
            summaryAthlete.setAllFieldsExceptId(updatedSummaryAthlete);
            summaryAthleteDAO.update(summaryAthlete);
        }
    }

    public SummaryAthlete getAthleteById(String id) {
        if (id != null)
            return summaryAthleteDAO.findById(id);
        else return null;
    }
}
