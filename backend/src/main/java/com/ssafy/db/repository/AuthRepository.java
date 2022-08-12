package com.ssafy.db.repository;

import com.ssafy.db.entity.Auth;
import com.ssafy.db.entity.User;
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

    public List<Auth> findByEmail(String email) {
        return em.createQuery("select a from Auth a where a.email = :email", Auth.class)
                .setParameter("email", email)
                .getResultList();
    }

    public List<Auth> findByUser(User user) {
        return em.createQuery("select a from Auth a where a.user = :user", Auth.class)
                .setParameter("user", user)
                .getResultList();
    }
}
