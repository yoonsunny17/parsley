package com.ssafy.db.repository;

import com.ssafy.db.entity.DailyGoal;
import com.ssafy.db.entity.Herb;
import com.ssafy.db.entity.Notification;
import com.ssafy.db.entity.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;

@Repository
public class NotificationRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(Notification notification){
        em.persist(notification);
    }
}
