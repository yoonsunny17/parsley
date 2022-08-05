package com.ssafy.db.repository;

import com.ssafy.db.entity.HerbRate;
import com.ssafy.db.entity.Item;
import com.ssafy.db.entity.ItemSeed;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * 허브 타입 확률 관련 Repository
 */
@Repository
public class HerbRateRepository {
    @PersistenceContext
    private EntityManager em;

    public HerbRate findBySeedIdAndRate(ItemSeed itemSeed, int rate){
        return em.createQuery("select h from HerbRate h where h.itemSeed = :itemSeed " +
                        "and h.herbRate >= :rate order by h.herbRate", HerbRate.class)
                .setParameter("itemSeed", itemSeed)
                .setParameter("rate", rate)
                .getResultList()
                .get(0);
    }
}
