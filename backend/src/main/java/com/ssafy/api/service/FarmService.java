package com.ssafy.api.service;

import com.ssafy.api.request.HerbAddPostReq;
import com.ssafy.api.request.UserHerbBookAddPostReq;
import com.ssafy.api.response.farm.HerbRes;
import com.ssafy.api.response.farm.HerbsRes;
import com.ssafy.api.response.farm.UserHerbBookAddPostRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import javax.persistence.Tuple;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Autowired
    NotificationRepository notificationRepository;

    public List<ItemSeed> getAllItemSeeds(){
        return itemRepository.findAllItemSeed();
    }

    public List<ItemWater> getAllItemWaters(){
        return itemRepository.findAllItemWater();
    }

    public List<ItemFertilizer> getAllFertilizers(){
        return itemRepository.findAllItemFertilizer();
    }

    public Map<HerbBook, Integer> getHerbBooks(Long userId) {
        User user = userRepository.findByUserId(userId);
        List<UserHerbBook> userHerbBooks = user.getUserHerbBooks();
        List<HerbBook> herbBooks = herbBookRepository.findAll();
        Map<HerbBook, Integer> map = new HashMap<>();
        int size = herbBooks.size();

        for(HerbBook herbBook : herbBooks){
            map.put(herbBook, 0);
        }

        for(UserHerbBook userHerbBook : userHerbBooks){
            if(map.containsKey(userHerbBook.getHerbBook())){
                int cnt = map.get(userHerbBook.getHerbBook());
                map.put(userHerbBook.getHerbBook(), cnt+1);
            }
        }

        return map;
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
        long sley = 0;
        switch (herbBook.getHerbType()){
            case COMMON:
                sley = 100;
                break;
            case RARE:
                sley = 300;
                break;
            case EPIC:
                sley = 500;
                break;
            case LEGENDARY:
                sley = 700;
                break;
            case MYSTERY:
                sley = 1000;
                break;
        }
        //추가 슬리
        int leftTime = (int)studyTime(herb.getStartDate(), (long)herb.getGrowthTime(), user.getDailyStudyLogs());
        double maxAdd = (1+leftTime*1.0/herb.getGrowthTime() >= 2.0 ? 2.0 : 1+(leftTime*1.0)/herb.getGrowthTime());

        sley = (long)(sley * (1+(item.getItemFertilizer().getSleyRate() *1.0)/100) * maxAdd);
        StringBuilder content = new StringBuilder();
        content.append("작물 수확(").append(herbBook.getName()).append(")");

        addNotificationLog((int)sley, content.toString(), user, NotificationType.SLEY);

        UserHerbBookAddPostRes res = new UserHerbBookAddPostRes();
        res.setAddSley(sley);
        sley += user.getCurrentSley();
        user.setCurrentSley(sley);

        //도감 포인트
        long point = herbBook.getPoint();

        addNotificationLog((int)point, content.toString(), user, NotificationType.POINT);

        res.setAddPoint(point);
        point += user.getCurrentBookPoint();
        user.setCurrentBookPoint(point);

        return res;
    }



    public HerbsRes getHerbs(Long userId) {
        HerbsRes herbListRes = new HerbsRes();
        User user = userRepository.findByUserId(userId);

        List<Herb> herbs = user.getHerbs();

        List<HerbRes> list = new ArrayList<>();
        if(herbs == null){
            return null;
        }
        for (Herb herb : herbs) {
            if(herb.isCompleted()) continue;
            HerbRes res = new HerbRes();
            res.setHerbId(herb.getId());
            res.setPosition(herb.getPosition());
            Item item = herb.getItem();
            res.setItemSeedId(item.getItemSeed().getId());
            res.setItemWaterId(item.getItemWater().getId());
            res.setItemFertilizerId(item.getItemFertilizer().getId());

            int leftTime = (int)studyTime(herb.getStartDate(), (long)herb.getGrowthTime(), user.getDailyStudyLogs());
            res.setLeftTime(leftTime);

            list.add(res);
        }

        herbListRes.setHerbs(list);
        return herbListRes;
    }

    @Transactional
    public boolean addHerb(Long userId, HerbAddPostReq herbInfo) {
        Herb herb = new Herb();
        User user = userRepository.findByUserId(userId);
        ItemSeed itemSeed = itemRepository.findByItemSeedId(herbInfo.getItemSeedId());
        ItemWater itemWater = itemRepository.findByItemWaterId(herbInfo.getItemWaterId());
        ItemFertilizer itemFertilizer = itemRepository.findByItemFertilizerId(herbInfo.getItemFertilizerId());
        Item item = new Item(itemSeed, itemWater, itemFertilizer);

        int sum = itemSeed.getSley() + itemWater.getSley() + itemFertilizer.getSley();
        if(user.getCurrentSley() < sum){
            return false;
        }

        int growthTime = (int) (itemSeed.getGrowthTime() * (1 - itemWater.getTimeRate() * 1.0 / 100)* 60) ;
        LocalDateTime date = LocalDateTime.now();
        herb.setStartDate(date);
        herb.setCompleted(false);
        herb.setGrowthTime(growthTime);
        herb.setItem(item);
        herb.setUser(user);
        herb.setPosition(herbInfo.getPosition());

        StringBuilder content = new StringBuilder();
        content.append("작물 심기(").append(itemSeed.getName()).append(", ")
                .append(itemWater.getName()).append(", ").append(itemFertilizer.getName()).append(")");
        addNotificationLog(sum*-1, content.toString() , user, NotificationType.SLEY);
        long currentSley = user.getCurrentSley()-sum;
        user.setCurrentSley(currentSley);

        herbRepository.save(herb);
        return true;
    }

    private void addNotificationLog(int value, String content, User user, NotificationType type){
        Notification notification = new Notification();
        LocalDateTime date = LocalDateTime.now();
        notification.setDate(date);
        notification.setValue(value);
        notification.setContent(content);
        notification.setUser(user);
        notification.setNotificationType(type);

        notificationRepository.save(notification);
    }

    private long studyTime(LocalDateTime herbDate, long growthTime, List<DailyStudyLog> studyLogs){
        int size = studyLogs.size();
        long time = 0;
        Duration duration = null;
        for (int i = 0; i < size; i+=2) {
            if(studyLogs.get(i).getTime().isBefore(herbDate)) continue;
            LocalDateTime tLog = studyLogs.get(i).getTime();
            LocalDateTime fLog = studyLogs.get(i+1).getTime();

            duration = Duration.between(tLog, fLog);
            time += duration.getSeconds();
        }

        return time - growthTime;
    }

}
