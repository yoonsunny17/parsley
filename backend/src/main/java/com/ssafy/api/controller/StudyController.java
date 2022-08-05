package com.ssafy.api.controller;

import com.ssafy.api.request.GoalCreatePostReq;
import com.ssafy.api.request.LogCreatePostReq;
import com.ssafy.api.response.GoalCreatePostRes;
import com.ssafy.api.response.GoalGetRes;
import com.ssafy.api.response.LogCreatePostRes;
import com.ssafy.api.response.WeeklyStudyGetRes;
import com.ssafy.api.service.StudyService;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.DailyGoal;
import com.ssafy.db.entity.DailyStudyLog;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @ApiResponses({
            @ApiResponse(code = 200, message = "오늘의 목표 시간 조회 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/goal")
    public ResponseEntity<? extends GoalGetRes>  getDailyGoal(){
        //TODO: user 정보 가져오기
        Long userId = 1L;

        int targetTime = studyService.getTargetTime(userId);

        return ResponseEntity.status(200)
                .body(GoalGetRes.of(200, "success", targetTime));
    }

    @ApiResponses({
            @ApiResponse(code = 201, message = "오늘의 목표 시간 등록 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PostMapping("/goal/create")
    public ResponseEntity<? extends GoalCreatePostRes> createDailyGoal(@RequestBody GoalCreatePostReq goalInfo) {
        //TODO: user 정보 가져오기(userid로 user 찾기)
        User user = userRepository.findByUserId(1L);

        DailyGoal dailyGoal = studyService.createDailyGoal(user, goalInfo);

        if(dailyGoal == null){
            return ResponseEntity.status(500)
                    .body(GoalCreatePostRes.of(500, "Fail to Create Goal", null));
        }

        return ResponseEntity.status(200)
                .body(GoalCreatePostRes.of(200, "Success", dailyGoal.getId()));

    }

    @ApiResponses({
            @ApiResponse(code = 201, message = "오늘의 목표 시간 수정 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PostMapping("/goal/update")
    public ResponseEntity<? extends GoalCreatePostRes> updateDailyGoal(@RequestBody GoalCreatePostReq goalInfo){
        //TODO: user 정보 가져오기
        Long userId = 2L;

        DailyGoal dailyGoal = studyService.updateDailyGoal(userId, goalInfo);

        if(dailyGoal == null){
            return ResponseEntity.status(500)
                    .body(GoalCreatePostRes.of(500,"Fail to Update Goal", null));
        }

        return ResponseEntity.status(200)
                .body(GoalCreatePostRes.of(200, "Success", dailyGoal.getId()));
    }

    @ApiResponses({
            @ApiResponse(code = 201, message = "주간 공부량 조회 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/weekly")
    public ResponseEntity<? extends WeeklyStudyGetRes> getWeeklyStudyTime(){
        //TODO: user 정보 가져오기
        User user = userRepository.findByUserId(3L);

        List<Long> week = studyService.getWeeklyStudyTime(user);

        if(week.isEmpty()){
            return ResponseEntity.status(500)
                    .body(WeeklyStudyGetRes.of(500, "Fail to Get Weekly List", null));
        }

        return ResponseEntity.status(200)
                .body(WeeklyStudyGetRes.of(200, "Success", week));

    }

    @ApiResponses({
            @ApiResponse(code = 200, message = "공부 시작 / 공부 끝"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PostMapping("/log/add")
    public ResponseEntity<? extends LogCreatePostRes> createStudyLog(@RequestBody LogCreatePostReq logInfo){
        //TODO: user 정보 가져오기
        Long userId = 1L;
        User user = userRepository.findByUserId(userId);
//        User user = userService.createUser();

        DailyStudyLog dailyStudyLog = studyService.addDailyGoal(user, logInfo);

        if(dailyStudyLog == null){
            return ResponseEntity.status(500)
                    .body(LogCreatePostRes.of(500, "Fail to Create Log", null));
        }

        return ResponseEntity.status(200)
                .body(LogCreatePostRes.of(200, "Success", dailyStudyLog.getId()));
    }
}
