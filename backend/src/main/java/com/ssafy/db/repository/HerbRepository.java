package com.ssafy.db.repository;

import com.ssafy.db.entity.Herb;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class HerbRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(Herb herb) {
        em.persist(herb);
    }
}