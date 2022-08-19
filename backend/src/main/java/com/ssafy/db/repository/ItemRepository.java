package com.ssafy.db.repository;

import com.ssafy.db.entity.HerbBook;
import com.ssafy.db.entity.ItemFertilizer;
import com.ssafy.db.entity.ItemSeed;
import com.ssafy.db.entity.ItemWater;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class ItemRepository {

    @PersistenceContext
    private EntityManager em;

    public ItemSeed findByItemSeedId(Integer itemSeedId){
        return em.find(ItemSeed.class, itemSeedId);
    }

    public ItemWater findByItemWaterId(Integer itemWaterId){
        return em.find(ItemWater.class, itemWaterId);
    }

    public ItemFertilizer findByItemFertilizerId(Integer itemFertilizerId){
        return em.find(ItemFertilizer.class, itemFertilizerId);
    }

    public List<ItemSeed> findAllItemSeed(){
        return em.createQuery("select s from ItemSeed s", ItemSeed.class)
                .getResultList();
    }

    public List<ItemWater> findAllItemWater(){
        return em.createQuery("select w from ItemWater w", ItemWater.class)
                .getResultList();
    }

    public List<ItemFertilizer> findAllItemFertilizer(){
        return em.createQuery("select f from ItemFertilizer f", ItemFertilizer.class)
                .getResultList();
    }
}