package com.ssafy.api.controller;

import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.AuthService;
import com.ssafy.api.service.JwtService;
import com.ssafy.api.service.KakaoService;
import com.ssafy.common.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

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
@RequestMapping("/api/v1/users")
public class UserController {

//	@Autowired
//	UserService userService;
//
//	@PostMapping()
//	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
//    @ApiResponses({
//        @ApiResponse(code = 200, message = "성공"),
//        @ApiResponse(code = 401, message = "인증 실패"),
//        @ApiResponse(code = 404, message = "사용자 없음"),
//        @ApiResponse(code = 500, message = "서버 오류")
//    })
//	public ResponseEntity<? extends BaseResponseBody> register(
//			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
//
//		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
//		User user = userService.createUser(registerInfo);
//
//		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
//	}
//
//	@GetMapping("/me")
//	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
//    @ApiResponses({
//        @ApiResponse(code = 200, message = "성공"),
//        @ApiResponse(code = 401, message = "인증 실패"),
//        @ApiResponse(code = 404, message = "사용자 없음"),
//        @ApiResponse(code = 500, message = "서버 오류")
//    })
//	public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
//		/**
//		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
//		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
//		 */
//		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
//		String userId = userDetails.getUsername();
//		User user = userService.getUserByUserId(userId);
//
//		return ResponseEntity.status(200).body(UserRes.of(user));
//	}

    @Autowired
    private KakaoService kakaoService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> kakaoLogin(@RequestParam String code, HttpServletResponse response) {
        // 인가 코드로 받은 토큰을 이용해 user의 정보 중 email을 반환
        String kakaoEmail = kakaoService.getKakaoEmail(code);

        // db에 user가 있는지 email을 통해 확인 후 없으면 저장
        if (!authService.checkEmail(kakaoEmail)) {
            User user = userService.createUser();
            authService.createAuth(user, kakaoEmail);
        }
//        String token = JwtTokenUtil.getToken(kakaoEmail);
        String refreshToken = jwtService.createRefreshToken();
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setMaxAge(86400 * 1000);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);

//        TokenVO tokenVO = new TokenVO();
//        tokenVO.setEmail(kakaoEmail);
//        tokenVO.setRefreshToken(refreshToken);
//        int tokenIdx = userService.addToken(tokenVO);
//        userInfo.put("tokenIdx", Integer.toString(tokenIdx));

        User user = authService.getUserByEmail(kakaoEmail);
        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("userName", user.getName());
        userInfo.put("description", user.getDescription());
        userInfo.put("profileImg", user.getProfileImgUrl());
        // + userInfo에 들어갈 정보 추가

        String accessToken = jwtService.createAccessToken("user", userInfo, "user");
        Cookie accessCookie = new Cookie("accessToken", accessToken);
        accessCookie.setMaxAge((int)System.currentTimeMillis() * 1800 * 1000);
        accessCookie.setSecure(true);
        accessCookie.setHttpOnly(true);
        accessCookie.setPath("/");
        response.addCookie(accessCookie);

        // + cache server에 token들을 저장하는 코드

        return new ResponseEntity<String>(accessToken, HttpStatus.OK);
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {

        String accessToken = null;
        String bearer = request.getHeader("Authorization");
        if(bearer != null && !"".equals(bearer)) {
            accessToken = bearer.split(" ")[1];
        }
        Cookie[] cookies = request.getCookies();
        for (Cookie c : cookies) {
            if ("accessToken".equals(c.getName())) {
                accessToken = c.getValue();
            }
        }

        if(accessToken != null && !"".equals(accessToken)) {
            // + cache server에서 token들을 삭제하는 코드
        }

        Cookie accessCookie = new Cookie("accessToken", null);
        accessCookie.setMaxAge(0);
        accessCookie.setPath("/");
        response.addCookie(accessCookie);

        Cookie refreshCookie = new Cookie("refreshToken", null);
        refreshCookie.setMaxAge(0);
        refreshCookie.setPath("/");
        response.addCookie(refreshCookie);

        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
