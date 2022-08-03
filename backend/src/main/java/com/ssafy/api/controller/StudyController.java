package com.ssafy.api.controller;

import com.ssafy.api.request.GoalCreatePostReq;
import com.ssafy.api.response.GoalCreatePostRes;
import com.ssafy.api.response.GoalGetRes;
import com.ssafy.api.service.StudyService;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.DailyGoal;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "학습 관리", tags = {"Study"})
@RestController
@RequestMapping("/study")
public class StudyController {

    @Autowired
    private StudyService studyService;

    @Autowired
    private UserService userService;

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
        User user = userService.createUser();

//        JSONObject sessionJSON = (JSONObject) new JSONParser().parse(targetTime);
//        int target = Integer.parseInt((String)sessionJSON.get("targetTime"));

        DailyGoal dailyGoal = studyService.createDailyGoal(goalInfo, user);

        return ResponseEntity.status(200)
                .body(GoalCreatePostRes.of(200, "success", dailyGoal.getId()));

    }


    //TODO: 오늘의 목표 시간 수정 -> GoalCreatePostReq, GoalCreatePostRes 이름 변경 필요
    @PostMapping("/goal/update")
    public ResponseEntity<? extends GoalCreatePostRes> updateDailyGoal(@RequestBody GoalCreatePostReq goalInfo){
        //TODO: user 정보 가져오기
        Long userId = 3L;

        DailyGoal dailyGoal = studyService.updateDailyGoal(goalInfo, userId);

        return ResponseEntity.status(200)
                .body(GoalCreatePostRes.of(200, "success", dailyGoal.getId()));
    }


    //TODO: 주간/일간 공부량 조회


    //TODO: 공부 시간 로그 추가
}
