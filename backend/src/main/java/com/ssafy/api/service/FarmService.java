package com.ssafy.api.service;

import com.ssafy.api.request.HerbAddPostReq;
import com.ssafy.api.request.UserHerbBookAddPostReq;
import com.ssafy.api.response.*;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
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

    @Autowired
    private HerbRateRepository herbRateRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Tuple> getHerbBooks(Long userId) {
        List<Tuple> userHerbBooks = userHerbBookRepository.findByUserAndGroupBy(userId);

        return userHerbBooks;
    }

    @Transactional
    public UserHerbBookAddPostRes addUserHerbBook(Long userId, UserHerbBookAddPostReq herbInfo) {
        //작물 수확 완료 처리
        Herb herb = herbRepository.findById(herbInfo.getHerbId());
        Item item = herb.getItem();
        herb.setCompleted(true);

        //허브타입 결정용 랜덤
        int percentage = (int)(Math.random()*100+1);

        //씨앗 id로 확률테이블 검색
        HerbRate herbRate = herbRateRepository.findBySeedIdAndRate(item.getItemSeed(), percentage);

        //도감에서 허브 타입 조회
        List<HerbBook> herbBooks = herbBookRepository.findByHerbType(herbRate.getHerbType());
        percentage = (int)(Math.random()*herbBooks.size());
        HerbBook herbBook = herbBooks.get(percentage);

        UserHerbBook userHerbBook = new UserHerbBook();
        User user = userRepository.findByUserId(userId);
        userHerbBook.setUser(user);
        userHerbBook.setHerbBook(herbBook);
        userHerbBook.setObtainedDate(LocalDateTime.now());
        userHerbBookRepository.save(userHerbBook);

        //비료에 따른 슬리 추가(씨앗 금액 기준으로)
        long sley = item.getItemSeed().getSley();

        //추가 슬리
        sley = (long)(sley * (item.getItemFertilizer().getSleyRate() *1.0)/100);
        UserHerbBookAddPostRes res = new UserHerbBookAddPostRes();
        res.setAddSley(sley);
        sley += user.getCurrentSley();
        user.setCurrentSley(sley);

        //도감 포인트
        long point = herbBook.getPoint();
        res.setAddPoint(point);
        point += user.getCurrentBookPoint();
        user.setCurrentBookPoint(point);

        return res;
    }



    public HerbsRes getHerbs(Long userId) {
        HerbsRes herbListRes = new HerbsRes();
        User user = userRepository.findByUserId(userId);
        List<Herb> herbs = herbRepository.findByUser(user);
        List<HerbRes> list = new ArrayList<>();
        if(herbs == null){
            return null;
        }
        for (Herb herb : herbs) {
            HerbRes res = new HerbRes();
            res.setHerbId(herb.getId());
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

    @Transactional
    public Herb addHerb(Long userId, HerbAddPostReq herbInfo) {
        Herb herb = new Herb();
        User user = userRepository.findByUserId(userId);
        ItemSeed itemSeed = itemRepository.findByItemSeedId(herbInfo.getItemSeedId());
        ItemWater itemWater = itemRepository.findByItemWaterId(herbInfo.getItemWaterId());
        ItemFertilizer itemFertilizer = itemRepository.findByItemFertilizerId(herbInfo.getItemFertilizerId());
        Item item = new Item(itemSeed, itemWater, itemFertilizer);

        int growthTime = (int) (itemSeed.getGrowthTime() * (1 - itemWater.getTimeRate() * 1.0 / 100));
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
