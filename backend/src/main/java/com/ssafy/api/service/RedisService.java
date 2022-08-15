package com.ssafy.api.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;

    public RedisService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }
    public void saveTokens(String email, String refreshToken, String accessToken) {
        String tokens = accessToken+" "+refreshToken;
        redisTemplate.opsForValue().set(email, tokens);
    }

    public void deleteTokens(String kakaoEmail) {
        redisTemplate.delete(kakaoEmail);
    }

    public String getTokens(String kakaoEmail) {
        return (String) redisTemplate.opsForValue().get(kakaoEmail);
    }
}
