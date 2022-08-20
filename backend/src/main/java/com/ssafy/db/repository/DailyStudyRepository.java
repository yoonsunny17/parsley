package com.ssafy.db.repository;

import com.ssafy.db.entity.DailyStudyLog;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;

@Repository
public class DailyStudyRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(DailyStudyLog dailyStudyLog){
        em.persist(dailyStudyLog);
    }

    public List<DailyStudyLog> findWeeklyByUserId(Long userId, LocalDate targetDate){
        String sql = "select * from daily_study_log l where date(l.time) = ? and user_id = ?";
        return em.createNativeQuery(sql, DailyStudyLog.class).setParameter(1, targetDate).setParameter(2, userId).getResultList();
    }

    public void delete(DailyStudyLog dailyStudyLog){
        em.remove((dailyStudyLog));
    }
}
