package com.ssafy.api.controller;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.api.request.RoomUpdatePostReq;
import com.ssafy.api.response.*;
import com.ssafy.api.service.RoomService;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "방 관리 API", tags = {"Room"})
@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    RoomService roomService;

    @GetMapping("/")
    @ApiOperation(value = "방 목록 조회", notes = "방 목록들을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 목록 조회 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends RoomsGetRes> getRooms() {
        List<Room> rooms = roomService.getRooms();

        return ResponseEntity.status(200).body(
                RoomsGetRes.of(200, "Success", rooms)
        );
    }

    @GetMapping("/{room_id}")
    @ApiOperation(value = "방 하나 조회", notes = "방 ID 값으로 방 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 하나 조회 성공"),
            @ApiResponse(code = 404, message = "방 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends RoomGetRes> getRoom(@PathVariable("room_id") Long roomId) {
        Room room = roomService.getRoomByRoomId(roomId);

        if(room == null) {
            return ResponseEntity.status(404).body(
                    RoomGetRes.of(404, "Room Not Found", room)
            );
        }

        return ResponseEntity.status(200).body(
                RoomGetRes.of(200, "Success", room)
        );
    }

    @PostMapping("/create")
    @ApiOperation(value = "방 생성", notes = "생성된 방 id 값을 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "방 생성 성공"),
            @ApiResponse(code = 404, message = "방 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends RoomPostRes> create(
            @RequestBody @ApiParam(value = "방 생성 정보", required = true) RoomCreatePostReq roomInfo) {
        // TODO: user 정보 갖고 와서 넘겨주기

        Room room = roomService.createRoom(roomInfo);

        if(room == null) {
            return ResponseEntity.status(404).body(
                    RoomPostRes.of(404, "Fail to create", 0L)
            );
        }

        return ResponseEntity.status(201).body(
                RoomPostRes.of(201, "Success", room.getId()));
    }

    @PostMapping("/{room_id}/update")
    @ApiOperation(value = "방 수정", notes = "방 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "방 수정 성공"),
            @ApiResponse(code = 404, message = "방 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends RoomPostRes> update(
            @PathVariable("room_id") Long roomId,
            @RequestBody @ApiParam(value = "방 수정 정보", required = true) RoomUpdatePostReq roomInfo) {
        // TODO: 현재 삭제하려는 User와 hostUser가 같은지 확인하는 로직 추가

        Room room = roomService.updateRoom(roomId, roomInfo);
        if(room == null) {
            return ResponseEntity.status(404).body(
                    RoomPostRes.of(404, "Room Not Found", 0L)
            );
        }

        return ResponseEntity.status(201).body(
                RoomPostRes.of(201, "Success", room.getId())
        );
    }

    @GetMapping("/{room_id}/delete")
    @ApiOperation(value = "방 삭제", notes = "방을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "방 삭제 성공"),
            @ApiResponse(code = 404, message = "방 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends RoomPostRes> delete(@PathVariable("room_id") Long roomId) {
        Room room = roomService.deleteRoom(roomId);
        if(room == null) {
            return ResponseEntity.status(404).body(
                    RoomPostRes.of(404, "Room Not Found", 0L)
            );
        }

        return ResponseEntity.status(201).body(
                RoomPostRes.of(201, "Success", room.getId())
        );
    }

    // TODO: 비공개방 API

    // TODO: 방 검색

    // TODO: 해시태그 관리 - Room Entity에 해시태그 추가, create 시 해시태그 데이터 추가

}