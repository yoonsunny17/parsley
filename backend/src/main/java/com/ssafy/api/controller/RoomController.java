package com.ssafy.api.controller;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.api.response.RoomCreatePostRes;
import com.ssafy.api.service.RoomService;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "방 관리 API", tags = {"Room"})
@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    RoomService roomService;

    @PostMapping("/create")
    @ApiOperation(value = "방 생성", notes = "생성된 방 id 값을 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "방 생성 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends RoomCreatePostRes> create(
            @RequestBody @ApiParam(value = "방 생성 정보", required = true) RoomCreatePostReq roomInfo) {
        // TODO: user 정보 갖고 와서 넘겨주기
        // User hostUserInfo = jwtService.
        System.out.println(roomInfo);

        Room room = roomService.createRoom(roomInfo);

        return ResponseEntity.status(200).body(
                RoomCreatePostRes.of(200, "Success", room.getId()));
    }

    // TODO: 방 목록 조회, 방 하나 조회

    // TODO: 방 삭제

    // TODO: 방 정보 수정
}
