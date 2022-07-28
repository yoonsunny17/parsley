package com.ssafy.api.service;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoService {

    public String getKakaoEmail(String code) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders tokenRequestHeader = new HttpHeaders(); // http 요청 헤더 만들기
        tokenRequestHeader.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> tokenRequestBody = new LinkedMultiValueMap<>(); // http 요청 바디 만들기
        tokenRequestBody.add("grant_type", "authorization_code");
        tokenRequestBody.add("code", code);
        tokenRequestBody.add("client_id", "c363c1414c4795051bf51aea0b37c03d");
        tokenRequestBody.add("client_secret", "6VKJcXSj18I1tc7Gho56LaMnjnqwPtBl");
        tokenRequestBody.add("redirect_uri", "http://localhost:8080//api/v1/auth/kakao");

        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(tokenRequestBody,
                tokenRequestHeader);

        ResponseEntity<String> tokenResponse = restTemplate.exchange( // 인증 코드로 토큰을 요청한다.
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                tokenRequest,
                String.class
        );
        JSONObject jsonObject;
        try {
            jsonObject = new JSONObject(tokenResponse.getBody());
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        JSONObject kakao_account = (JSONObject) jsonObject.get("kakao_account");
        String email = kakao_account.getString("email");

        return email;
    }
}
