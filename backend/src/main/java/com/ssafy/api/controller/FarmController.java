package com.ssafy.api.controller;

import com.ssafy.api.request.HerbAddPostReq;
import com.ssafy.api.request.UserHerbBookAddPostReq;
import com.ssafy.api.response.*;
import com.ssafy.api.service.FarmService;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.Herb;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Tuple;
import javax.validation.Valid;
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
    UserService userService;

    @GetMapping("/book")
    @ApiOperation(value = "작물 수집 내역", notes = "user정보를 이용하여 작물 수집 내역 가져오기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "수집 작물 조회 성공"),
            @ApiResponse(code = 404, message = ""),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends UserHerbBooksRes> getUserHerbBook() {
        //TODO: User받아오기, 아래 코드 삭제
        Long userId = 1L;

        List<Tuple> herbBooks = farmService.getHerbBooks(userId);
        return ResponseEntity.status(200).body(UserHerbBooksRes.of(200, "Success", herbBooks));
    }

    @PostMapping("/book/add")
    @ApiOperation(value = "획득 작물 추가", notes = "user정보와 herbBookId를 이용하여 도감에 획득한 작물 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "도감에 획득 작물 추가 성공"),
            @ApiResponse(code = 500, message = "도감에 획득 작물 추가 실패")
    })
    public ResponseEntity<? extends UserHerbBookAddPostRes> addUserHerbBook(
            @RequestBody @ApiParam(value = "수확한 작물 정보", required = true) @Valid UserHerbBookAddPostReq herbBookInfo) {
        //TODO: User받아오기, 아래 코드 삭제
        Long userId = 1L;
        //TODO: response를 controller에서 처리할 것인가 controller에서 처리할 것인가
        //TODO: lefttime이 0이상일때 나중에 처리!!
        UserHerbBookAddPostRes userHerbBookAddPostRes = farmService.addUserHerbBook(userId, herbBookInfo);
        if(userHerbBookAddPostRes == null){
            return ResponseEntity.status(500).body(UserHerbBookAddPostRes.of(500, "Fail to add user herb book", null));
        }
        return ResponseEntity.status(200).body(UserHerbBookAddPostRes.of(200, "Success", userHerbBookAddPostRes));
    }

    @GetMapping("/herb")
    @ApiOperation(value = "작물 조회", notes = "user정보를 이용하여 작물 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "작물 조회 성공"),
            @ApiResponse(code = 404, message = ""),
            @ApiResponse(code = 500, message = "작물 조회 실패")
    })
    public ResponseEntity<?> getHerbs() {
        //TODO: User받아오기, 아래 코드 삭제
        Long userId = 1L;

        HerbsRes herbs = farmService.getHerbs(userId);

        if(herbs == null){
            return ResponseEntity.status(200).body(HerbsRes.of(200, "There are no herbs", null));
        }

        return ResponseEntity.status(200).body(HerbsRes.of(200, "Success", herbs.getHerbs()));
    }

    @PostMapping("/herb/add")
    @ApiOperation(value = "작물 추가", notes = "position, seedId, waterId, fertilizerId를 이용하여 농장에 작물 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "작물 추가 성공"),
            @ApiResponse(code = 404, message = ""),
            @ApiResponse(code = 500, message = "작물 추가 실패")
    })
    public ResponseEntity<?> addHerb(@RequestBody @ApiParam(value = "심을 작물 정보", required = true)
                                     @Valid HerbAddPostReq herbInfo) {
        //TODO: User받아오기, 아래 코드 삭제
        Long userId = 1L;

        Herb herb = farmService.addHerb(userId, herbInfo);
        return ResponseEntity.status(200).body(HerbAddPostRes.of(200, "Success", herb.getId()));
    }
}
