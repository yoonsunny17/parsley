package com.ssafy.db.repository;

import com.ssafy.db.entity.Auth;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * 인증 모델 관련 Repository
 */
@Repository
public class AuthRepository {
    @PersistenceContext
    private EntityManager em;

    public void save(Auth auth) {
        em.persist(auth);
    }

    public List<Auth> findByEmail(String email){
        return em.createQuery("select a from Auth a where a.email = :email", Auth.class)
                .setParameter("email", email)
                .getResultList();
    }

    public List findbyEmail(String email) {
        return null;
    }
}
