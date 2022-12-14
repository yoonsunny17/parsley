package com.ssafy.db.repository;

import com.ssafy.db.entity.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * 사용자 관련 Repository
 */
@Repository
public class UserRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(User user) {
        em.persist(user);
    }

    public User findByUserId(Long userId){
        return em.find(User.class, userId);
    }

    public List<User> findByName(String name){
        return em.createQuery("select u from User u where u.name = :name", User.class)
                .setParameter("name", name)
                .getResultList();
    }

    public List<User> findTopUsersByCurrentBookPoint() {
        return em.createQuery("select u from User u order by u.currentBookPoint desc", User.class)
                .setFirstResult(0)
                .setMaxResults(1000)
                .getResultList();
    }
}
