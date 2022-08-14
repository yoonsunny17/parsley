package com.ssafy.api.controller;

import com.ssafy.api.response.RankGetRes;
import com.ssafy.api.response.RankInfoRes;
import com.ssafy.api.service.*;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.*;

@Api(value = "공부왕/농부왕 조회 API", tags = {"Rank"})
@RestController
@RequestMapping("/rank")
public class RankController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RankService rankService;

    @Autowired
    private UserService userService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private StudyService studyService;

    @GetMapping("/nongbu")
    @ApiOperation(value = "농부왕 전체 랭킹 조회", notes = "농부왕 Top 5와 내 등수 가져오기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "농부왕 전체 랭킹 조회 성공"),
            @ApiResponse(code = 404, message = ""),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends RankGetRes> getNongbuRanking() {
        Long rankSize = rankService.getRankSize();
        if (rankSize == 0) { // redis 캐시에 없는 경우
            rankService.saveHerbBookRank();
        }

        // Top 5 가져와서 저장
        List<RankInfoRes> topRank = new ArrayList<>();
        Set<ZSetOperations.TypedTuple<Object>> top5Rank = rankService.getTop5Rank();
        long idx = 1;

        for (ZSetOperations.TypedTuple<Object> topUser : top5Rank) {
            String value = (String) topUser.getValue();
            User user = userService.getUserByUserId(
                    Long.parseLong(value.replace("user:", "")));

            topRank.add(RankInfoRes.of(user.getName(), topUser.getScore(), idx++));
        }

        // 나의 rank 정보 저장
        RankInfoRes myRank = null;
        Long userId = jwtService.getUserId();
        if (userId == null) { // 로그인하지 않은 경우
            myRank = RankInfoRes.of("guest", null, null);
        } else { // 로그인한 경우
            Long ranking = rankService.getMyRankByUserId(userId);
            User user = userService.getUserByUserId(userId);

            if (ranking != null) {
                ranking = ranking <= 1000 ? ranking : -1;
            }
            myRank = RankInfoRes.of(user.getName(), (double) user.getCurrentBookPoint(), ranking);
        }

        return ResponseEntity.status(200).body(
                RankGetRes.of(200, "Success", topRank, myRank));
    }

    @GetMapping("/{room_id}/nongbu")
    @ApiOperation(value = "방 내 농부 랭킹 조회", notes = "방 ID 값으로 참가자의 농부 랭킹을 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 내 참가자의 농부 랭킹 조회 성공"),
            @ApiResponse(code = 404, message = "방 조회 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends RankGetRes> getNongbuRankingByRoomId(
            @PathVariable("room_id") @Valid Long roomId
    ) {
        Room room = roomService.getRoomByRoomId(roomId);
        if (room == null) {
            return ResponseEntity.status(404).body(
                    RankGetRes.of(404, "Room not found", null, null));
        }

        List<User> members = room.getMembers();
        members.sort((a, b) -> (int) (b.getCurrentBookPoint() - a.getCurrentBookPoint()));

        Long userId = jwtService.getUserId();
        List<RankInfoRes> topRank = new ArrayList<>();
        RankInfoRes myRank = null;

        for (int i = 0; i < members.size(); i++) {
            User user = members.get(i);
            topRank.add(RankInfoRes.of(
                    user.getName(), (double) user.getCurrentBookPoint(), i + 1L));

            if (userId != null && userId.equals(user.getId())) {
                myRank = RankInfoRes.of(user.getName(), (double) user.getCurrentBookPoint(), (long) i);
            }
        }

        return ResponseEntity.status(200).body(
                RankGetRes.of(200, "Success", topRank, myRank));
    }

    @GetMapping("/{room_id}/gongbu")
    @ApiOperation(value = "방 내 공부 랭킹 조회", notes = "방 ID 값으로 참가자의 공부 랭킹을 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 내 참가자의 공부 랭킹 조회 성공"),
            @ApiResponse(code = 404, message = "방 조회 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends RankGetRes> getGongbuRankingByRoomId(
            @PathVariable("room_id") @Valid Long roomId
    ) {
        Room room = roomService.getRoomByRoomId(roomId);
        if (room == null) {
            return ResponseEntity.status(404).body(
                    RankGetRes.of(404, "Room not found", null, null));
        }

        List<User> members = room.getMembers();

        Long userId = jwtService.getUserId();
        List<RankInfoRes> topRank = new ArrayList<>();
        RankInfoRes myRank = null;

        // 각 member의 일주일치 공부량 가져오기
        for (int i = 0; i < members.size(); i++) {
            User user = members.get(i);
            List<Long> weeklyStudyTime = studyService.getWeeklyStudyTime(user.getId());
            long totalTime = weeklyStudyTime.stream().mapToLong(Long::longValue).sum();

            topRank.add(RankInfoRes.of(user.getName(), (double) totalTime, (long) i));

            if (userId != null && userId.equals(user.getId())) {
                myRank = RankInfoRes.of(user.getName(), (double) user.getCurrentBookPoint(), (long) i);
            }
        }
        topRank.sort((a, b) -> (int) (b.getScore() - a.getScore()));

        // 랭킹 재조정
        for (int i = 0; i < topRank.size(); i++) {
            if (myRank != null && myRank.getRank().equals(topRank.get(i).getRank())) {
                myRank.setRank(i + 1L);
            }
            topRank.get(i).setRank(i + 1L);
        }

        return ResponseEntity.status(200).body(
                RankGetRes.of(200, "Success", topRank, myRank));
    }
}
