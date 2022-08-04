package com.ssafy.api.controller;

import com.ssafy.api.request.HerbAddPostReq;
import com.ssafy.api.request.UserHerbBookAddPostReq;
import com.ssafy.api.response.HerbAddPostRes;
import com.ssafy.api.response.HerbListRes;
import com.ssafy.api.response.UserHerbBookAddPostRes;
import com.ssafy.api.service.FarmService;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.Herb;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserHerbBook;
import com.ssafy.db.repository.UserRepository;
import io.swagger.annotations.*;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 농장게임 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "농장게임 관리 API", tags = {"Farm"})
@RestController
@RequestMapping("/farm")
public class FarmController {

    @Autowired
    FarmService farmService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    //TODO: 허브수집 내역 가져오기


    @PostMapping("/book/add")
    @ApiOperation(value = "획득 작물 추가", notes = "user정보와 herbBookId를 이용하여 도감에 획득한 작물 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "도감에 획득 작물 추가 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends UserHerbBookAddPostRes> addUserHerbBook(
            @RequestBody @ApiParam(value = "herbBookId", required = true) UserHerbBookAddPostReq herbBookInfo){
        //TODO: User받아오기, 아래 코드 삭제
        //user 가져옴
//        User user = userRepository.findByUserId(2L);
        User user = userService.createUser();
        System.out.println(user.getName() + "테스트입니당 아이디: " + user.getId());
        UserHerbBook userHerbBook = farmService.addUserHerbBook(user, herbBookInfo);
        System.out.println("무엇이 문제인가?" + userHerbBook.getId());
        return ResponseEntity.status(200).body(UserHerbBookAddPostRes.of(200, "Success", userHerbBook.getId()));
    }

    //TODO: 작물 조회
    @GetMapping("/herb")
    @ApiOperation(value = "작물 조회", notes = "user정보를 이용하여 작물 조회")
    public ResponseEntity<?> getHerbs(){
        //TODO: User받아오기, 아래 코드 삭제
        User user = userRepository.findByUserId(2L);
        HerbListRes herbs = farmService.getHerbs(user);
        return ResponseEntity.status(200).body(HerbListRes.of(200, "Success", herbs.getHerbs()));
    }

    //TODO: 작물 추가
    @PostMapping("/herb/add")
    @ApiOperation(value = "작물 추가", notes = "position, seedId, waterId, fertilizerId를 이용하여 농장에 작물 추가")
    public ResponseEntity<?> addHerb(@RequestBody @ApiParam(value = "position, seedId, waterId, fertilizerId", required = true)
                                     HerbAddPostReq herbInfo){
        System.out.println("제발제발");
        //TODO: User받아오기, 아래 코드 삭제
        //user
        User user = userService.createUser();

        Herb herb = farmService.addHerb(user, herbInfo);
        return ResponseEntity.status(200).body(HerbAddPostRes.of(200, "Success", herb.getId()));
    }
}
