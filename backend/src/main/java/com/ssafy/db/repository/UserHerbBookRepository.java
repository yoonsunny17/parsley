package com.ssafy.db.repository;

import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserHerbBook;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Tuple;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
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

    public List<UserHerbBook> findByUser(User user){
        return em.createQuery("select u from UserHerbBook u where u.user = :user", UserHerbBook.class)
                .setParameter("user", user)
                .getResultList();
    }

    public List<Tuple> findByUserAndGroupBy(User user){
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Tuple> q = cb.createTupleQuery();
        Root<UserHerbBook> c = q.from(UserHerbBook.class);
        q.multiselect(c.get("herbBook"), cb.count(c));
        q.where(cb.equal(c.get("user"), user));
        q.groupBy(c.get("herbBook"));

        TypedQuery<Tuple> t = em.createQuery(q);
        List<Tuple> resultList = t.getResultList();

//        for(Tuple tuple : resultList){
//            System.out.println(tuple.get(0) + "   " + tuple.get(1));
//        }
        return resultList;
    }
}