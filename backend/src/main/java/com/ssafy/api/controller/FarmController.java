package com.ssafy.api.controller;

import com.ssafy.api.request.HerbAddPostReq;
import com.ssafy.api.request.UserHerbBookAddPostReq;
import com.ssafy.api.response.farm.HerbsRes;
import com.ssafy.api.response.farm.ItemsRes;
import com.ssafy.api.response.farm.UserHerbBookAddPostRes;
import com.ssafy.api.response.farm.UserHerbBooksRes;
import com.ssafy.api.service.FarmService;
import com.ssafy.api.service.JwtService;
import com.ssafy.api.service.RankService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;

import com.ssafy.db.entity.*;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Tuple;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;

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

    @Autowired
    JwtService jwtService;

    @Autowired
    RankService rankService;

    @GetMapping("/item")
    @ApiOperation(value = "전체 아이템 조회", notes = "전체 아이템 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "전체 아이템 조회 성공"),
            @ApiResponse(code = 404, message = ""),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends ItemsRes> getAllItems() {
        List<ItemSeed> itemSeeds = farmService.getAllItemSeeds();
        List<ItemWater> itemWaters = farmService.getAllItemWaters();
        List<ItemFertilizer> itemFertilizers = farmService.getAllFertilizers();
        return ResponseEntity.status(200).body(ItemsRes.of(200, "Success", itemSeeds, itemWaters, itemFertilizers));
    }

    @GetMapping("/book")
    @ApiOperation(value = "작물 수집 내역", notes = "user정보를 이용하여 작물 수집 내역 가져오기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "수집 작물 조회 성공"),
            @ApiResponse(code = 404, message = ""),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends UserHerbBooksRes> getUserHerbBook() {
        Long userId = jwtService.getUserId();

        Map<HerbBook, Integer> herbBooks = farmService.getHerbBooks(userId);
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
        Long userId = jwtService.getUserId();
        if (userId == null) {
            return ResponseEntity.status(500).body(UserHerbBookAddPostRes.of(500, "Not Authorized", null));
        }

        UserHerbBookAddPostRes userHerbBookAddPostRes = farmService.addUserHerbBook(userId, herbBookInfo);

        // ranking 정보 업데이트하기
        User user = userService.getUserByUserId(userId);
        Long lastRankScore = Double.valueOf(rankService.getLastRankScore()).longValue();
        Long currentBookPoint = user.getCurrentBookPoint();
        Long addPoint = userHerbBookAddPostRes.getAddPoint();

        if(currentBookPoint - addPoint < lastRankScore) {
            if(currentBookPoint >= lastRankScore) {
                rankService.addRank(user);
            }
        } else {
            rankService.addRank(user);
        }

        if (userHerbBookAddPostRes == null) {
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
        Long userId = jwtService.getUserId();
        HerbsRes herbs = farmService.getHerbs(userId);

        if (herbs == null) {
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
        Long userId = jwtService.getUserId();

        boolean herb = farmService.addHerb(userId, herbInfo);
        if (!herb) {
            return ResponseEntity.status(202).body(BaseResponseBody.of(202, "슬리가 부족합니다."));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
