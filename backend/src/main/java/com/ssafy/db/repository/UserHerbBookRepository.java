package com.ssafy.db.repository;

import com.ssafy.db.entity.UserHerbBook;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

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
