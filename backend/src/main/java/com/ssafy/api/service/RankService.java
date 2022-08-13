package com.ssafy.api.service;

import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

@Service
public class RankService {

    private final String ZSET_KEY = "rank";
    private final String MEMBER_PREFIX = "user:";

    @Autowired
    @Qualifier("redisTemplate2")
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private UserRepository userRepository;

    // currentBookPoint Top 1000 DB에서 가져와서 Cache에 저장
    public void saveHerbBookRank() {
        List<User> topUsers = userRepository.findTopUsersByCurrentBookPoint();

        for (User u : topUsers) {
            redisTemplate.opsForZSet().add(
                    ZSET_KEY, MEMBER_PREFIX + Long.toString(u.getId()), u.getCurrentBookPoint());
        }
    }

    // rank라는 key 값을 가진 zSet이 있는가
    public Long getRankSize() {
        return redisTemplate.opsForZSet().zCard(ZSET_KEY);
    }

    // top 5 정보 가져오기
    public Set<ZSetOperations.TypedTuple<Object>> getTop5Rank() {
        return redisTemplate.opsForZSet().reverseRangeWithScores(ZSET_KEY, 0, 4);
    }

    // 내 등수 가져오기
    public Long getMyRankByUserId(Long userId) {
        Long rank = redisTemplate.opsForZSet().reverseRank(ZSET_KEY, MEMBER_PREFIX + Long.toString(userId));

        if (rank != null) {
            return rank + 1;
        }
        return rank; // 없는 경우
    }

    public Double getMyScoreByUserId(Long userId) {
        return redisTemplate.opsForZSet().score(ZSET_KEY, MEMBER_PREFIX + Long.toString(userId));
    }

    // 1000등의 point 가져오기
    public Long getLastRankScore() {
        Set<ZSetOperations.TypedTuple<Object>> set = redisTemplate.opsForZSet().rangeWithScores(ZSET_KEY, 999, 999);
        Iterator<ZSetOperations.TypedTuple<Object>> it = set.iterator();
        ZSetOperations.TypedTuple<Object> next = it.next();

//        return it.hasNext() ? it.ne;xt() : null;
        return null;
    }
}
