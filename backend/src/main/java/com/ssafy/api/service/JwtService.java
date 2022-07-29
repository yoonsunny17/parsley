package com.ssafy.api.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Date;

@Service
public class JwtService {

    private static final String SALT = "parsley";


    public <T> String createAccessToken(String key, T data, String subject){
        Date now = new Date();
        String jwt = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setIssuedAt(now)
                .setSubject(subject)
                .setExpiration(new Date(System.currentTimeMillis() + 60))
                .claim(key, data)
                .signWith(SignatureAlgorithm.HS256, this.generateKey())
                .compact();
        return jwt;
    }

    public String createRefreshToken() {
        Date now = new Date();
        String jwt = Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(new Date(System.currentTimeMillis() + 86400 * 7))
                .signWith(SignatureAlgorithm.HS256, this.generateKey())
                .compact();
        return jwt;
    }

    private byte[] generateKey(){
        byte[] key = null;
        try {
            key = SALT.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return key;
    }
}
