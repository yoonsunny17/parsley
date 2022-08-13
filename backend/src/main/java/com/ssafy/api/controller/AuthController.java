package com.ssafy.api.controller;

import com.ssafy.api.response.AuthRes;
import com.ssafy.api.service.*;
import com.ssafy.common.util.CookieUtil;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * 사용자 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "사용자 인증 API", tags = {"Auth"})
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private KakaoService kakaoService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CookieUtil cookieUtil;

    @Autowired
    private RedisService redisService;

    @GetMapping("/login")
    @ApiOperation(value = "로그인", notes = "카카오로 로그인한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그인 성공"),
            @ApiResponse(code = 202, message = "유저 생성 실패"),
            @ApiResponse(code = 403, message = "탈퇴한 회원입니다."),
            @ApiResponse(code = 409, message = "이메일 수신을 동의해주세요."),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends AuthRes> kakaoLogin(@RequestParam String code, HttpServletResponse response) throws IOException {
//        System.out.println(code);
        // 인가 코드로 받은 토큰을 이용해 user의 정보 중 email을 반환
        String kakaoEmail = null;
        try {
            kakaoEmail = kakaoService.getKakaoEmail(code);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(AuthRes.of(409, "Conflict", null, false, 0L));
        }

        // db에 user가 있는지 email을 통해 확인 후 없으면 저장
        if (!authService.checkEmail(kakaoEmail)) {
            try {
                User user = userService.createUser();
                authService.createAuth(user, kakaoEmail);
            } catch (IOException e) {
                return ResponseEntity.status(202).body(AuthRes.of(202, "Accepted", null, false, 0L));
            }
        }

        User user = authService.getUserByEmail(kakaoEmail);
        if (user.isWithdrawn()) {
            return ResponseEntity.status(403).body(AuthRes.of(403, "Forbidden", null, false, user.getId()));
        }
        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("id", user.getId() + "");

        String accessToken = jwtService.createAccessToken("user", userInfo, "user");
        Cookie accessCookie = cookieUtil.addAccessCookie(accessToken);
        response.addCookie(accessCookie);

        String refreshToken = jwtService.createRefreshToken("user", userInfo, "user");
        Cookie refreshCookie = cookieUtil.addRefreshCookie(refreshToken);
        response.addCookie(refreshCookie);

        // + cache server에 token들을 저장하는 코드
        redisService.saveTokens(kakaoEmail, refreshToken, accessToken);

        return ResponseEntity.status(200).body(AuthRes.of(200, "Success", accessToken, true, user.getId()));
    }

    @GetMapping("/logout")
    @ApiOperation(value = "로그아웃", notes = "로그아웃을 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그아웃 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends AuthRes> logout(HttpServletRequest request, HttpServletResponse response) {

        String accessToken = null;
        String refreshToken = null;
        String bearer = request.getHeader("Authorization");
        if (bearer != null && !"".equals(bearer)) {
            accessToken = bearer.split(" ")[1];
        }
        Cookie[] cookies = request.getCookies();
        for (Cookie c : cookies) {
            if ("accessToken".equals(c.getName())) {
                accessToken = c.getValue();
            } else if ("refreshToken".equals(c.getName())) {
                refreshToken = c.getValue();
            }
        }

        Long userId = Long.parseLong((String) jwtService.getUserInfo(refreshToken).get("id"));
        String kakaoEmail = authService.getEmailbyUserId(userId);

        if (accessToken != null && !"".equals(accessToken)) {
            // cache server에서 token들 삭제
            redisService.deleteTokens(kakaoEmail);
        }

        Cookie accessCookie = new Cookie("accessToken", null);
        accessCookie.setMaxAge(0);
        accessCookie.setPath("/");
        response.addCookie(accessCookie);

        Cookie refreshCookie = new Cookie("refreshToken", null);
        refreshCookie.setMaxAge(0);
        refreshCookie.setPath("/");
        response.addCookie(refreshCookie);

        return ResponseEntity.status(200).body(AuthRes.of(200, "Success", null, true, userId));
    }

    @GetMapping("/refresh")
    @ApiOperation(value = "토큰 재발급", notes = "토큰을 재발급한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "토큰 재발급 성공"),
            @ApiResponse(code = 202, message = "토큰 재발급 실패")
    })
    public ResponseEntity<?> refreshUser(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        String accessToken = null;
        String refreshToken = null;
        if (cookies == null) {
            return new ResponseEntity<String>("로그인 해주세요", HttpStatus.ACCEPTED);
        }
        for (Cookie c : cookies) {
            if ("accessToken".equals(c.getName())) {
                accessToken = c.getValue();
            } else if ("refreshToken".equals(c.getName())) {
                refreshToken = c.getValue();
            }
        }

        Long userId = Long.parseLong((String) jwtService.getUserInfo(refreshToken).get("id"));
        String kakaoEmail = authService.getEmailbyUserId(userId);

        try {
            if (refreshToken != null && jwtService.isUsable(refreshToken)) {
                accessToken = jwtService.createAccessToken("user", jwtService.getUserInfo(accessToken), "user");
                Cookie accessCookie = cookieUtil.addAccessCookie(accessToken);
                response.addCookie(accessCookie);

                // cache server에 token 다시 저장
                redisService.saveTokens(kakaoEmail, refreshToken, accessToken);

                return ResponseEntity.status(200).body(AuthRes.of(200, "Success", accessToken, true, userId));
            }
        } catch (JwtException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return ResponseEntity.status(202).body(AuthRes.of(202, "Accepted", null, false, userId));
    }
}
