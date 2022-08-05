package com.ssafy.api.controller;

import com.ssafy.api.request.UserReq;
import com.ssafy.api.service.*;
import com.ssafy.common.util.CookieUtil;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.response.UserRes;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/user")
public class UserController {

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
    public ResponseEntity<?> kakaoLogin(@RequestParam String code, HttpServletResponse response) {
        System.out.println(code);
        // 인가 코드로 받은 토큰을 이용해 user의 정보 중 email을 반환
        String kakaoEmail = kakaoService.getKakaoEmail(code);

        // db에 user가 있는지 email을 통해 확인 후 없으면 저장
        if (!authService.checkEmail(kakaoEmail)) {
            User user = userService.createUser();
            authService.createAuth(user, kakaoEmail);
        }
        String refreshToken = jwtService.createRefreshToken();
        Cookie refreshCookie = cookieUtil.addRefreshCookie(refreshToken);
        response.addCookie(refreshCookie);

        User user = authService.getUserByEmail(kakaoEmail);
        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("id", user.getId() + "");
//        userInfo.put("description", user.getDescription());
//        userInfo.put("profileImg", user.getProfileImgUrl());
        // + userInfo에 들어갈 정보 고민해보기

        String accessToken = jwtService.createAccessToken("user", userInfo, "user");
        Cookie accessCookie = cookieUtil.addAccessCookie(accessToken);
        response.addCookie(accessCookie);

        // + cache server에 token들을 저장하는 코드
        redisService.saveTokens(kakaoEmail, refreshToken, accessToken);

        return ResponseEntity.status(200).body(UserRes.of(200, "Success", user.getId()));
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {

        String accessToken = null;
        String bearer = request.getHeader("Authorization");
        if (bearer != null && !"".equals(bearer)) {
            accessToken = bearer.split(" ")[1];
        }
        Cookie[] cookies = request.getCookies();
        for (Cookie c : cookies) {
            if ("accessToken".equals(c.getName())) {
                accessToken = c.getValue();
            }
        }

        Long userId = jwtService.getUserId();
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

        return ResponseEntity.status(200).body(UserRes.of(200, "Success", 0L));
    }

    @GetMapping("/refresh")
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

        Long userId = jwtService.getUserId();
        String kakaoEmail = authService.getEmailbyUserId(userId);

        try {
            if (refreshToken != null && jwtService.isUsable(refreshToken)) {
                // + cache server에 token 다시 갱신해주는 코드
                redisService.saveTokens(kakaoEmail, refreshToken, accessToken);

                accessToken = jwtService.createAccessToken("user", jwtService.getUserInfo(accessToken), "user");
                Cookie accessCookie = cookieUtil.addAccessCookie(accessToken);
                response.addCookie(accessCookie);

                return ResponseEntity.status(200).body(UserRes.of(200, "Success", 1L));
            }
        } catch (JwtException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return ResponseEntity.status(202).body(UserRes.of(202, "Accepted", 0L));
    }


    @PostMapping("/delete")
    @ApiOperation(value = "유저 삭제", notes = "로그인한 회원을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "삭제 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends UserRes> deleteUser() {
        User user = userService.getUser(jwtService.getUserId());
        userService.deleteUser(user);
        return ResponseEntity.status(200).body(UserRes.of(200, "Success", user.getId()));
    }

    @PostMapping("/update")
    @ApiOperation(value = "유저 수정", notes = "로그인한 회원 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "회원 정보 수정 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends UserRes> updateUser(@RequestBody UserReq userInfo) {
        User user = userService.getUser(jwtService.getUserId());
        userService.updateUser(user, userInfo);
        return ResponseEntity.status(200).body(UserRes.of(200, "Success", user.getId()));
    }
}
