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
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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
            @ApiResponse(code = 400, message = "오늘의 목표 시간 조회 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends GoalGetRes>  getDailyGoal(){
        Long userId = jwtService.getUserId();

        int targetTime = studyService.getTargetTime(userId);

        return ResponseEntity.status(200)
                .body(GoalGetRes.of(200, "success", targetTime));
    }

    @PostMapping("/goal/create")
    @ApiOperation(value = "오늘의 목표 시간 등록", notes = "사용자가 설정한 목표시간을 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "오늘의 목표 시간 등록 성공"),
            @ApiResponse(code = 400, message = "오늘의 목표 시간 등록 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends GoalCreatePostRes> createDailyGoal(@RequestBody @Valid GoalCreatePostReq goalInfo) {
        Long userId = jwtService.getUserId();

        DailyGoal dailyGoal = studyService.createDailyGoal(userId, goalInfo);

        if(dailyGoal == null){
            return ResponseEntity.status(400)
                    .body(GoalCreatePostRes.of(400, "Fail to Create Goal", null));
        }

        return ResponseEntity.status(200)
                .body(GoalCreatePostRes.of(200, "Success", dailyGoal.getId()));

    }

    @PostMapping("/goal/update")
    @ApiOperation(value = "오늘의 목표 시간 수정", notes = "오늘의 목표시간을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "오늘의 목표 시간 수정 성공"),
            @ApiResponse(code = 400, message = "오늘의 목표 시간 수정 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends GoalCreatePostRes> updateDailyGoal(@RequestBody @Valid GoalCreatePostReq goalInfo){
        Long userId = jwtService.getUserId();

        DailyGoal dailyGoal = studyService.updateDailyGoal(userId, goalInfo);

        if(dailyGoal == null){
            return ResponseEntity.status(400)
                    .body(GoalCreatePostRes.of(400,"Fail to Update Goal", null));
        }

        return ResponseEntity.status(200)
                .body(GoalCreatePostRes.of(200, "Success", dailyGoal.getId()));
    }

    @ApiResponses({
            @ApiResponse(code = 201, message = "주간 공부량 조회 성공"),
            @ApiResponse(code = 400, message = "주간 공부량 조회 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/weekly")
    public ResponseEntity<? extends WeeklyStudyGetRes> getWeeklyStudyTime(){
        Long userId = jwtService.getUserId();

        List<Long> week = studyService.getWeeklyStudyTime(userId);

        if(week.isEmpty()){
            return ResponseEntity.status(400)
                    .body(WeeklyStudyGetRes.of(400, "Fail to Get Weekly List", null));
        }

        return ResponseEntity.status(200)
                .body(WeeklyStudyGetRes.of(200, "Success", week));

    }

    @PostMapping("/log/add")
    @ApiOperation(value = "공부 로그", notes = "공부를 시작할 떄는 status가 T, 공부가 끝날 때는 status가 F로 현재 시간에 대한 로그를 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "공부 시작 / 공부 끝"),
            @ApiResponse(code = 400, message = "공부 로그 등록 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends LogCreatePostRes> createStudyLog(@RequestBody @Valid LogCreatePostReq logInfo){
        Long userId = jwtService.getUserId();

        DailyStudyLog dailyStudyLog = studyService.addDailyGoal(userId, logInfo);

        if(dailyStudyLog == null){
            return ResponseEntity.status(400)
                    .body(LogCreatePostRes.of(400, "Fail to Create Log", null));
        }

        return ResponseEntity.status(200)
                .body(LogCreatePostRes.of(200, "Success", dailyStudyLog.getId()));
    }
}
