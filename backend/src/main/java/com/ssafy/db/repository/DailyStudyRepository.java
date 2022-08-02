package com.ssafy.db.repository;

import com.ssafy.db.entity.DailyStudyLog;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class DailyStudyRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(DailyStudyLog dailyStudyLog){
        em.persist(dailyStudyLog);
    }
}
