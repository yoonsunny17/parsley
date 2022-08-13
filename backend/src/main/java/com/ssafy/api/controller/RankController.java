package com.ssafy.api.controller;

import com.ssafy.api.response.RankNongbuGetRes;
import com.ssafy.api.service.JwtService;
import com.ssafy.api.service.RankService;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

@Api(value = "공부왕/농부왕 조회 API", tags = {"Rank"})
@RestController
@RequestMapping("/rank")
public class RankController {

    @Autowired
    JwtService jwtService;

    @Autowired
    RankService rankService;

    @Autowired
    UserService userService;

    @GetMapping("/nongbu")
    @ApiOperation(value = "농부왕 전체 랭킹 조회", notes = "농부왕 Top 5와 내 등수 가져오기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "농부왕 전체 랭킹 조회 성공"),
            @ApiResponse(code = 404, message = ""),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends RankNongbuGetRes> getNongbuRanking() {
        Long rankSize = rankService.getRankSize();
        if (rankSize == 0) {
            rankService.saveHerbBookRank();
        }

        Map<String, Double> topRank = new HashMap<>();
        Set<ZSetOperations.TypedTuple<Object>> top5Rank = rankService.getTop5Rank();

        for (ZSetOperations.TypedTuple<Object> topUser : top5Rank) {
            String value = (String) topUser.getValue();

            User user = userService.getUserByUserId(
                    Long.parseLong(value.replace("user:", "")));

            topRank.put(user.getName(), topUser.getScore());
        }

        Map<String, Long> myRank = new HashMap<>();
        Long userId = jwtService.getUserId();
        if (userId == null) { // 로그인하지 않은 경우
            myRank.put("guest", (long) -1);
        } else { // 로그인한 경우
            Long ranking = rankService.getMyRankByUserId(userId);
            User user = userService.getUserByUserId(userId);

            if (ranking != null) {
                ranking = ranking <= 1000 ? ranking : 0;
            }

            myRank.put(user.getName(), ranking);
        }

        return ResponseEntity.status(200).body(
                RankNongbuGetRes.of(200, "Success", topRank, myRank));
    }
}
