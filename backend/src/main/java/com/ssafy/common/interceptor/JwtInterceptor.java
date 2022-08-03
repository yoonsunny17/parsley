package com.ssafy.common.interceptor;

import com.ssafy.api.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JwtInterceptor implements HandlerInterceptor {
    private static final String HEADER_AUTH = "auth-token";

    @Autowired
    private JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        // axios의 Preflight OPTION 요청 거름
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }

        // cookie에서 토큰들을 가져옴(없으면 null)
        String bearer = request.getHeader(HEADER_AUTH);
        String accessToken = null;
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for(Cookie cookie : cookies) {
                if("refreshToken".equals(cookie.getName())){
                    refreshToken = cookie.getValue();
                } else if("accessToken".equals(cookie.getName())){
                    accessToken = cookie.getValue();
                }
            }
        }

        // cache에서 토큰들을 가져옴
        String cacheAccessToken = null;
        String cacheRefreshToken = null;
        // + cache에서 가져와서 할당해줄거임

        // cookie의 accessToken이 유효한지 확인
        if(bearer != null && !"".equals(bearer)) {
            final String token = request.getHeader(HEADER_AUTH).split(" ")[1];
            try {
                if (token != null && !"".equals(bearer) && jwtService.isUsable(token)) {
                    return true;
                }
            } catch(ExpiredJwtException e) {
                try {
                    // cacheAccessToken이 비었을 경우
                    if (cacheAccessToken == null) {
                        response.sendError(445, "로그인해주세요. (1)");
                        return false;
                    }
                    // cacheAccessToken과의 String 비교(어떻게 들어오는지 확인해봐야함)
                    if (accessToken != null && !accessToken.equals(cacheAccessToken)) {
                        response.sendError(445, "로그인해주세요. (2)");
                        return false;
                    }

                    // refreshToken이 유효한지 확인
                    if (refreshToken != null && jwtService.isUsable(refreshToken)) {
                        // cacheRefreshToken이 비었을 경우
                        if (cacheRefreshToken == null) {
                            response.sendError(445, "로그인해주세요. (3)");
                            return false;
                        }

                        // cacheRefreshToken과의 String 비교
                        if (refreshToken.equals(cacheRefreshToken)) {
                            response.sendError(444, "기존 토큰이 만료되었습니다. 해당 토큰을 가지고 새 토큰을 발급받습니다..");
                            return false;
                        }
                    }
                } catch(Exception reLogin) {
                    System.out.println(reLogin.getMessage());
                }
            } catch(Exception e) {
                System.out.println(e.getMessage());
            }
        }

        // 1. accessToken이나 refreshToken이 null이어서 로그인이 필요한 경우
        // 2. refreshToken이 유효하지 않은 경우
        // 3. refreshToken과 cacheRefreshToken이 다른 경우
        // 4. 기타 오류가 생긴 경우
        // => 쿠키를 비우고 재로그인

        Cookie accessCookie = new Cookie("accessToken", null);
        accessCookie.setMaxAge(0);
        accessCookie.setPath("/");
        response.addCookie(accessCookie);

        Cookie refreshCookie = new Cookie("refreshToken", null);
        refreshCookie.setMaxAge(0);
        refreshCookie.setPath("/");
        response.addCookie(refreshCookie);
        response.sendError(445, "다시 로그인해주세요. (4)");

        return false;
    }
}
