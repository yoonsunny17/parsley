package com.ssafy.api.controller;

import com.ssafy.api.request.GoalCreatePostReq;
import com.ssafy.api.response.GoalCreatePostRes;
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

    //TODO: 오늘의 목표 시간 조회


    //TODO: 오늘의 목표 시간 등록
    @ApiResponses({
            @ApiResponse(code = 201, message = "오늘의 목표 시간 등록 성공")
    })
    @PostMapping("/goal/create")
    public ResponseEntity<? extends GoalCreatePostRes> createDailyGoal(@RequestBody GoalCreatePostReq goalInfo) throws ParseException {
        //TODO: user 정보 가져오기(userid)
        System.out.println("-----------------");
        User user = userService.createUser();
        System.out.println("user -----------------");

//        JSONObject sessionJSON = (JSONObject) new JSONParser().parse(targetTime);
//        int target = Integer.parseInt((String)sessionJSON.get("targetTime"));

        DailyGoal dailyGoal = studyService.createDailyGoal(goalInfo, user);

        System.out.println("=============");
        System.out.println(dailyGoal.getId());
        System.out.println(dailyGoal.getDate());

        return ResponseEntity.status(200)
                .body(GoalCreatePostRes.of(200, "success", dailyGoal.getId()));

    }


    //TODO: 오늘의 목표 시간 수정


    //TODO: 주간/일간 공부량 조회


    //TODO: 공부 시간 로그 추가
}
