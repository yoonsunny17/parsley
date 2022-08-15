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

    public List<Tuple> findByUserAndGroupBy(Long userId){
        String sql = "select h.herb_book_id, count(u.herb_book_id)\n" +
                "from herb_book h left join (select herb_book_id from user_herb_book where user_id = ?) u\n" +
                "on u.herb_book_id = h.herb_book_id\n" +
                "group by h.herb_book_id\n" +
                "order by h.herb_book_id";

        return em.createNativeQuery(sql, Tuple.class).setParameter(1, userId).getResultList();
    }
}