package com.ssafy.db.repository;

import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserHerbBook;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Tuple;
import java.util.List;

/**
 * 사용자 도감 Repository
 */
@Repository
public class UserHerbBookRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(UserHerbBook userHerbBook){
        em.persist(userHerbBook);
    }
}