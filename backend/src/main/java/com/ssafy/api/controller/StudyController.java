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

    @GetMapping("/goal")
    public ResponseEntity<? extends GoalGetRes>  getDailyGoal(){
        //TODO: user 정보 가져오기
        Long userId = 3L;

        int targetTime = studyService.getTargetTime(userId);

        return ResponseEntity.status(200)
                .body(GoalGetRes.of(200, "success", targetTime));
    }

    @ApiResponses({
            @ApiResponse(code = 201, message = "오늘의 목표 시간 등록 성공")
    })
    @PostMapping("/goal/create")
    public ResponseEntity<? extends GoalCreatePostRes> createDailyGoal(@RequestBody GoalCreatePostReq goalInfo) {
        //TODO: user 정보 가져오기(userid로 user 찾기)
        User user = userRepository.findByUserId(2L);

        DailyGoal dailyGoal = studyService.createDailyGoal(user, goalInfo);

        return ResponseEntity.status(200)
                .body(GoalCreatePostRes.of(200, "success", dailyGoal.getId()));

    }


    @PostMapping("/goal/update")
    public ResponseEntity<? extends GoalCreatePostRes> updateDailyGoal(@RequestBody GoalCreatePostReq goalInfo){
        //TODO: user 정보 가져오기
        Long userId = 2L;

        DailyGoal dailyGoal = studyService.updateDailyGoal(userId, goalInfo);

        return ResponseEntity.status(200)
                .body(GoalCreatePostRes.of(200, "success", dailyGoal.getId()));
    }


    @GetMapping("/weekly")
    public ResponseEntity<? extends WeeklyStudyGetRes> getWeeklyStudyTime(){
        //TODO: user 정보 가져오기
        User user = userRepository.findByUserId(3L);

        List<Long> week = studyService.getWeeklyStudyTime(user);

        return ResponseEntity.status(200)
                .body(WeeklyStudyGetRes.of(200, "success", week));

    }

    @PostMapping("/log/add")
    public ResponseEntity<? extends LogCreatePostRes> createStudyLog(@RequestBody LogCreatePostReq logInfo){
        //TODO: user 정보 가져오기
        Long userId = 3L;

        DailyStudyLog dailyStudyLog = studyService.addDailyGoal(userId, logInfo);

        return ResponseEntity.status(200)
                .body(LogCreatePostRes.of(200, "success", dailyStudyLog.getId()));
    }
}
