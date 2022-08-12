package com.ssafy.db.repository;

import com.ssafy.db.entity.DailyGoal;
import com.ssafy.db.entity.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;

@Repository
public class DailyGoalRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(DailyGoal dailyGoal){
        em.persist(dailyGoal);
    }

//    public DailyGoal findByUserId(Long userId){
//        return em.find(DailyGoal.class, userId);
//    }

    public DailyGoal findByUserId(Long userId){
        List<DailyGoal> dailyGoals= em.createQuery("select g from DailyGoal g where g.user.id = :userId and g.date = :today", DailyGoal.class)
                                    .setParameter("userId", userId)
                                    .setParameter("today", LocalDate.now()).getResultList();

        if(dailyGoals.size() >= 1){
            return dailyGoals.get(0);
        }else{
            return null;
        }
    }
}
