package com.ssafy.api.controller;

import com.ssafy.api.request.DDayPostReq;
import com.ssafy.api.request.GoalCreatePostReq;
import com.ssafy.api.response.study.*;
import com.ssafy.api.service.JwtService;
import com.ssafy.api.service.StudyService;
import com.ssafy.db.entity.DailyGoal;
import com.ssafy.db.entity.DailyStudyLog;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
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

        Long userId = jwtService.getUserId();

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

        Long userId = jwtService.getUserId();

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

        Long userId = jwtService.getUserId();

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
            @ApiResponse(code = 404, message = "스터디룸이 제대로 종료되지 않음"),
            @ApiResponse(code = 500, message = "주간 공부량 조회 실패")
    })
    public ResponseEntity<? extends WeeklyStudyGetRes> getWeeklyStudyTime(){

        Long userId = jwtService.getUserId();

        List<Long> week = studyService.getWeeklyStudyTime(userId);
        Long last_week = studyService.getLastWeekTime(userId);

        if(week == null){
            return ResponseEntity.status(404)
                    .body(WeeklyStudyGetRes.of(404, "Please finish study", null, last_week));
        }
        if(week.isEmpty()){
            return ResponseEntity.status(500)
                    .body(WeeklyStudyGetRes.of(500, "Fail to Get Weekly List", null, last_week));
        }

        return ResponseEntity.status(200)
                .body(WeeklyStudyGetRes.of(200, "Success", week, last_week));

    }

    @GetMapping("/log")
    @ApiOperation(value = "공부 로그", notes = "오늘 공부 로그를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "공부 로그 조회 성공"),
            @ApiResponse(code = 500, message = "공부 로그 조회 실패")
    })
    public ResponseEntity<? extends LogGetRes> getDailyStudyLog(){

        Long userId = jwtService.getUserId();

        List<DailyStudyLog> dailyStudyLogs = studyService.getDailyLogs(userId);

        if(dailyStudyLogs.isEmpty()){
            return ResponseEntity.status(500)
                    .body(LogGetRes.of(500, "Fail to Get Log", null));
        }

        return ResponseEntity.status(200)
                .body(LogGetRes.of(200, "Success", dailyStudyLogs));
    }

    @GetMapping("/dday")
    @ApiOperation(value = "디데이", notes = "디데이를 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "디데이 조회 성공"),
            @ApiResponse(code = 500, message = "디데이 조회 실패")
    })
    public ResponseEntity<? extends DDayGetRes>  getDDay(){
//        Long userId = jwtService.getUserId();
        Long userId = 1L;

        LocalDate dDay = studyService.getDDay(userId);

        if(dDay == null){
            return ResponseEntity.status(500)
                    .body(DDayGetRes.of(500, "Fail Get D-Day", null));
        }else{
            return ResponseEntity.status(200)
                    .body(DDayGetRes.of(200, "Success", dDay));
        }
    }

    @PostMapping("/dday/create")
    @ApiOperation(value = "디데이", notes = "디데이를 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "디데이 등록 성공"),
            @ApiResponse(code = 500, message = "디데이 등록 실패")
    })
    public ResponseEntity<? extends DDayGetRes>  createDDay(@RequestBody @ApiParam(value = "디데이 등록 정보", required = true) @Valid DDayPostReq dDayInfo){
//        Long userId = jwtService.getUserId();
        Long userId = 1L;

        LocalDate dDay = studyService.createDDay(userId, dDayInfo);

        if(dDay == null){
            return ResponseEntity.status(500)
                    .body(DDayGetRes.of(500, "Fail create D-Day", null));
        }else{
            return ResponseEntity.status(200)
                    .body(DDayGetRes.of(200, "Success", dDay));
        }
    }
}
