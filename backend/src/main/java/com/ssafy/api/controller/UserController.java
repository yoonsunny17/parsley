package com.ssafy.api.controller;

import com.ssafy.api.request.UserReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.JwtService;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/delete")
    @ApiOperation(value = "회원 탈퇴", notes = "로그인한 회원을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "회원 탈퇴 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends UserRes> deleteUser() {
        User user = userService.getUserByUserId(jwtService.getUserId());
        userService.deleteUser(user);
        return ResponseEntity.status(200).body(UserRes.of(201, "Success", user.getId()));
    }

    @PostMapping("/update")
    @ApiOperation(value = "유저 수정", notes = "로그인한 회원 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "회원 정보 수정 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends UserRes> updateUser(@RequestBody UserReq userInfo) {
        User user = userService.getUserByUserId(jwtService.getUserId());
        userService.updateUser(user, userInfo);
        return ResponseEntity.status(200).body(UserRes.of(201, "Success", user.getId()));
    }
}
