package com.ssafy.db.repository;

import com.ssafy.db.entity.HerbBook;
import com.ssafy.db.entity.UserHerbBook;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * 도감 Repository
 */
@Repository
public class HerbBookRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(HerbBook herbBook){
        em.persist(herbBook);
    }

    public HerbBook findByHerbBookId(Long herbBookId){
        return em.find(HerbBook.class, herbBookId);
    }
}
