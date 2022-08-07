package com.ssafy.api.controller;

import com.ssafy.api.request.GoalCreatePostReq;
import com.ssafy.api.request.LogCreatePostReq;
import com.ssafy.api.response.GoalCreatePostRes;
import com.ssafy.api.response.GoalGetRes;
import com.ssafy.api.response.LogCreatePostRes;
import com.ssafy.api.response.WeeklyStudyGetRes;
import com.ssafy.api.service.JwtService;
import com.ssafy.api.service.StudyService;
import com.ssafy.db.entity.DailyGoal;
import com.ssafy.db.entity.DailyStudyLog;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * 마이페이지 내 학습 관련 API 요청 처리를 위한 컨트롤러 정의.
 */

@Api(value = "학습 관리", tags = {"Study"})
@RestController
@RequestMapping("/study")
public class StudyController {

    @Autowired
    private StudyService studyService;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/goal")
    @ApiOperation(value = "오늘의 목표 시간 조회", notes = "사용자가 설정한 오늘의 목표시간을 조회한다. 목표시간이 설정되어있지 않으면 0 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "오늘의 목표 시간 조회 성공"),
            @ApiResponse(code = 404, message = "오늘의 목표 시간 조회 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends GoalGetRes>  getDailyGoal(){
//        Long userId = jwtService.getUserId();
        Long userId = 1L;

        int targetTime = studyService.getTargetTime(userId);

        return ResponseEntity.status(200)
                .body(GoalGetRes.of(200, "success", targetTime));
    }

    @PostMapping("/goal/create")
    @ApiOperation(value = "오늘의 목표 시간 등록", notes = "사용자가 설정한 목표시간을 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "오늘의 목표 시간 등록 성공"),
            @ApiResponse(code = 500, message = "오늘의 목표 시간 등록 실패")
    })
    public ResponseEntity<? extends GoalCreatePostRes> createDailyGoal(
            @RequestBody @ApiParam(value = "목표 생성 정보", required = true) @Valid GoalCreatePostReq goalInfo) {
//        Long userId = jwtService.getUserId();
        Long userId = 1L;

        DailyGoal dailyGoal = studyService.createDailyGoal(userId, goalInfo);

        if(dailyGoal == null){
            return ResponseEntity.status(500)
                    .body(GoalCreatePostRes.of(500, "Fail to Create Goal", null));
        }

        return ResponseEntity.status(200)
                .body(GoalCreatePostRes.of(200, "Success", dailyGoal.getId()));

    }

    @PostMapping("/goal/update")
    @ApiOperation(value = "오늘의 목표 시간 수정", notes = "오늘의 목표시간을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "오늘의 목표 시간 수정 성공"),
            @ApiResponse(code = 500, message = "오늘의 목표 시간 수정 실패")
    })
    public ResponseEntity<? extends GoalCreatePostRes> updateDailyGoal(
            @RequestBody @ApiParam(value = "목표 수정 정보", required = true) @Valid GoalCreatePostReq goalInfo){
//        Long userId = jwtService.getUserId();
        Long userId = 1L;

        DailyGoal dailyGoal = studyService.updateDailyGoal(userId, goalInfo);

        if(dailyGoal == null){
            return ResponseEntity.status(500)
                    .body(GoalCreatePostRes.of(500,"Fail to Update Goal", null));
        }

        return ResponseEntity.status(200)
                .body(GoalCreatePostRes.of(200, "Success", dailyGoal.getId()));
    }

    @GetMapping("/weekly")
    @ApiOperation(value = "주간 공부량 조회", notes = "이번주 월요일부터 조회 날짜까지의 공부시간을 조회한다.(현재 테스트 편의성을 위한 초단위)")
    @ApiResponses({
            @ApiResponse(code = 201, message = "주간 공부량 조회 성공"),
            @ApiResponse(code = 404, message = "주간 공부량 조회 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends WeeklyStudyGetRes> getWeeklyStudyTime(){
//        Long userId = jwtService.getUserId();
        Long userId = 1L;

        List<Long> week = studyService.getWeeklyStudyTime(userId);

        if(week.isEmpty()){
            return ResponseEntity.status(404)
                    .body(WeeklyStudyGetRes.of(404, "Fail to Get Weekly List", null));
        }

        return ResponseEntity.status(200)
                .body(WeeklyStudyGetRes.of(200, "Success", week));

    }

    @PostMapping("/log/add")
    @ApiOperation(value = "공부 로그", notes = "공부를 시작할 떄는 status가 T, 공부가 끝날 때는 status가 F로 현재 시간에 대한 로그를 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "공부 시작 / 공부 끝"),
            @ApiResponse(code = 500, message = "공부 로그 등록 실패")
    })
    public ResponseEntity<? extends LogCreatePostRes> createStudyLog(
            @RequestBody @ApiParam(value = "로그 생성 정보", required = true) @Valid LogCreatePostReq logInfo){
//        Long userId = jwtService.getUserId();
        Long userId = 1L;

        DailyStudyLog dailyStudyLog = studyService.addDailyGoal(userId, logInfo);

        if(dailyStudyLog == null){
            return ResponseEntity.status(500)
                    .body(LogCreatePostRes.of(500, "Fail to Create Log", null));
        }

        return ResponseEntity.status(200)
                .body(LogCreatePostRes.of(200, "Success", dailyStudyLog.getId()));
    }
}
