package com.ssafy.api.service;

import io.jsonwebtoken.*;
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

    public boolean isUsable(String token) {
        try{
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(this.generateKey())
                    .parseClaimsJws(token);
        } catch(ExpiredJwtException e) {
            // 유효기간 초과
            System.out.println(e.getMessage());
            throw e;
        } catch(UnsupportedJwtException e) {
            // 형식이 일치하지 않는 JWT
            System.out.println(e.getMessage());
            throw e;
        } catch(MalformedJwtException e) {
            // JWT가 올바르게 구성되지 않았을 경우
            System.out.println(e.getMessage());
            throw e;
        } catch(SignatureException e) {
            // 기존 서명을 확인하지 못한 경우
            System.out.println(e.getMessage());
            throw e;
        } catch(IllegalArgumentException e) {
            // claims가 비어있는 경우
            System.out.println(e.getMessage());
            throw e;
        } catch(Exception e) {
            throw e;
        }

        return true;
    }
}
