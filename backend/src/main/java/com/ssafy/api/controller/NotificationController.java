package com.ssafy.api.controller;

import com.ssafy.api.response.notification.NotificationGetCntRes;
import com.ssafy.api.response.notification.NotificationsGetRes;
import com.ssafy.api.service.JwtService;
import com.ssafy.api.service.NotificationService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Notification;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


/**
 * 알림 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "알림 관리 API", tags = {"Notification"})
@RestController
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @Autowired
    JwtService jwtService;

    @PostMapping
    @ApiOperation(value = "전체 알림 목록", notes = "user정보를 이용하여 전체 알림 목록 조회, 읽음처리")
    @ApiResponses({
            @ApiResponse(code = 200, message = "알림 조회 성공"),
            @ApiResponse(code = 404, message = ""),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends NotificationsGetRes> getNotifications() {

        Long userId = jwtService.getUserId();

        List<Notification> notifications = notificationService.getNotifications(userId);
        return ResponseEntity.status(200).body(NotificationsGetRes.of(200, "Success", notifications));
    }

    @GetMapping("/cnt")
    @ApiOperation(value = "읽지 않은 알림 개수 조회", notes = "user정보를 이용하여 읽지 않은 알림 개수 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "읽지 않은 알림 개수 조회 성공"),
            @ApiResponse(code = 404, message = ""),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends NotificationGetCntRes> getUncheckedNotificationsCnt() {

        Long userId = jwtService.getUserId();

        int uncheckCnt = notificationService.getUncheckedNotificationsCnt(userId);
        return ResponseEntity.status(200).body(NotificationGetCntRes.of(200, "Success", uncheckCnt));
    }

    @PostMapping("/delete")
    @ApiOperation(value = "전체 알림 삭제", notes = "user정보를 이용하여 전체 알림 목록 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "알림 삭제 성공"),
            @ApiResponse(code = 404, message = ""),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteNotifications() {

        Long userId = jwtService.getUserId();

        notificationService.deleteNotifications(userId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
