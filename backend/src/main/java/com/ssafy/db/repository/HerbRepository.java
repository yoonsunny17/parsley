package com.ssafy.db.repository;

import com.ssafy.db.entity.Herb;
import com.ssafy.db.entity.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class HerbRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(Herb herb) {
        em.persist(herb);
    }

    public List<Herb> findByUserId(User user){
        return em.createQuery("select h from Herb h where h.user = : user and h.isCompleted = false", Herb.class)
                .setParameter("user", user)
                .getResultList();
    }

    public Herb findById(Long herbId){
        return em.find(Herb.class, herbId);
    }
}