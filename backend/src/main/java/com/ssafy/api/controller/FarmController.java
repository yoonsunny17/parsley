package com.ssafy.api.controller;

import com.ssafy.api.request.HerbAddPostReq;
import com.ssafy.api.request.UserHerbBookAddPostReq;
import com.ssafy.api.response.*;
import com.ssafy.api.service.FarmService;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.Herb;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 농장게임 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "농장게임 관리 API", tags = {"Farm"})
@RestController
@RequestMapping("/api/v1/farm")
public class FarmController {

    @Autowired
    FarmService farmService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @GetMapping("/book")
    @ApiOperation(value = "작물 수집 내역", notes = "user정보를 이용하여 작물 수집 내역 가져오기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "수집 작물 조회 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getUserHerbBook() {
        //TODO: User받아오기, 아래 코드 삭제
        User user = userRepository.findByUserId(2L);
        HerbBookListRes herbBooks = farmService.getHerbBooks(user);
        return ResponseEntity.status(200).body(HerbBookListRes.of(200, "Success", herbBooks.getHerbBooks()));
    }

    @PostMapping("/book/add")
    @ApiOperation(value = "획득 작물 추가", notes = "user정보와 herbBookId를 이용하여 도감에 획득한 작물 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "도감에 획득 작물 추가 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> addUserHerbBook(
            @RequestBody @ApiParam(value = "herbBookId", required = true) UserHerbBookAddPostReq herbBookInfo) {
        //TODO: User받아오기, 아래 코드 삭제
        User user = userRepository.findByUserId(2L);
        UserHerbBookAddPostRes userHerbBookAddPostRes = farmService.addUserHerbBook(user, herbBookInfo);
        return ResponseEntity.status(200).body(UserHerbBookAddPostRes.of(200, "Success", userHerbBookAddPostRes));
    }

    @GetMapping("/herb")
    @ApiOperation(value = "작물 조회", notes = "user정보를 이용하여 작물 조회")
    public ResponseEntity<?> getHerbs() {
        //TODO: User받아오기, 아래 코드 삭제
        User user = userRepository.findByUserId(2L);
        HerbListRes herbs = farmService.getHerbs(user);
        return ResponseEntity.status(200).body(HerbListRes.of(200, "Success", herbs.getHerbs()));
    }

    @PostMapping("/herb/add")
    @ApiOperation(value = "작물 추가", notes = "position, seedId, waterId, fertilizerId를 이용하여 농장에 작물 추가")
    public ResponseEntity<?> addHerb(@RequestBody @ApiParam(value = "position, seedId, waterId, fertilizerId", required = true)
                                     HerbAddPostReq herbInfo) {
        //TODO: User받아오기, 아래 코드 삭제
        User user = userRepository.findByUserId(2L);
        Herb herb = farmService.addHerb(user, herbInfo);
        return ResponseEntity.status(200).body(HerbAddPostRes.of(200, "Success", herb.getId()));
    }
}
