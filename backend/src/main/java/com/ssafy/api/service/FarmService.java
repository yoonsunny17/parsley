package com.ssafy.api.service;

import com.ssafy.api.request.HerbAddPostReq;
import com.ssafy.api.request.UserHerbBookAddPostReq;
import com.ssafy.api.response.HerbBookListRes;
import com.ssafy.api.response.HerbBookRes;
import com.ssafy.api.response.HerbListRes;
import com.ssafy.api.response.HerbRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.HerbBookRepository;
import com.ssafy.db.repository.HerbRepository;
import com.ssafy.db.repository.ItemRepository;
import com.ssafy.db.repository.UserHerbBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import javax.persistence.Tuple;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 농장게임 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */

@Service
@Transactional(readOnly = true)
public class FarmService {

    @Autowired
    private UserHerbBookRepository userHerbBookRepository;

    @Autowired
    private HerbBookRepository herbBookRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private HerbRepository herbRepository;

    public List<UserHerbBook> getUserHerbBooks(User user) {
        List<UserHerbBook> userHerbBooks = userHerbBookRepository.findByUser(user);
        return userHerbBooks;
    }

    @Transactional
    public UserHerbBook addUserHerbBook(User user, UserHerbBookAddPostReq herbBookInfo) {
        UserHerbBook userHerbBook = new UserHerbBook();
        HerbBook herbBook = herbBookRepository.findByHerbBookId(herbBookInfo.getHerbBookId());
        System.out.println(herbBook.getName());
        LocalDateTime date = LocalDateTime.now();
        userHerbBook.setObtainedDate(date);
        userHerbBook.setUser(user);
        userHerbBook.setHerbBook(herbBook);

        userHerbBookRepository.save(userHerbBook);
        return userHerbBook;
    }
    //도감 작물 조회
    public HerbBookListRes getHerbBooks(User user){
        HerbBookListRes herbBookListRes = new HerbBookListRes();

        List<Tuple> userHerbBooks = userHerbBookRepository.findByUserAndGroupBy(user);
        List<HerbBookRes> list = new ArrayList<>();

        for(Tuple userHerbBook : userHerbBooks){
            HerbBookRes res = new HerbBookRes();
            HerbBook herbBook = (HerbBook)userHerbBook.get(0);
            res.setHerbBookId(herbBook.getId());
            res.setCount(Integer.parseInt(String.valueOf(userHerbBook.get(1))));
            list.add(res);
        }

        herbBookListRes.setHerbBooks(list);
        return herbBookListRes;
    }

    //작물 조회
    public HerbListRes getHerbs(User user) {
        HerbListRes herbListRes = new HerbListRes();

        List<Herb> herbs = herbRepository.findByUserId(user);
        List<HerbRes> list = new ArrayList<>();

        for (Herb herb : herbs) {
            HerbRes res = new HerbRes();
            res.setPosition(herb.getPosition());
            Item item = herb.getItem();
            res.setItemSeedId(item.getItemSeed().getId());
            res.setItemWaterId(item.getItemWater().getId());
            res.setItemFertilizerId(item.getItemFertilizer().getId());

            //TODO: 남은 시간 계산!!
            res.setLeftTime(herb.getGrowthTime());
            list.add(res);
        }

        herbListRes.setHerbs(list);
        return herbListRes;
    }

    //작물 추가
    @Transactional
    public Herb addHerb(User user, HerbAddPostReq herbInfo) {
        Herb herb = new Herb();

        ItemSeed itemSeed = itemRepository.findByItemSeedId(herbInfo.getItemSeedId());
        ItemWater itemWater = itemRepository.findByItemWaterId(herbInfo.getItemWaterId());
        ItemFertilizer itemFertilizer = itemRepository.findByItemFertilizerId(herbInfo.getItemFertilizerId());
        Item item = new Item(itemSeed, itemWater, itemFertilizer);

        int growthTime = (int) (itemSeed.getGrowthTime() * (1 - itemWater.getTimeRate() * 1.0 / 100));
        System.out.println(growthTime);
        LocalDateTime date = LocalDateTime.now();
        herb.setStartDate(date);
        herb.setCompleted(false);
        herb.setGrowthTime(growthTime);
        herb.setItem(item);
        herb.setUser(user);
        herb.setPosition(herbInfo.getPosition());

        herbRepository.save(herb);
        return herb;
    }
}
