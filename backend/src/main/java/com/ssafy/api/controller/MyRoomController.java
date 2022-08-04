package com.ssafy.api.controller;

import com.ssafy.api.request.MyRoomPostReq;
import com.ssafy.api.response.MyRoomPostRes;
import com.ssafy.api.response.RoomsGetRes;
import com.ssafy.api.response.UserRoomsGetRes;
import com.ssafy.api.service.MyRoomService;
import com.ssafy.api.service.RoomService;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(value = "사용자별 방 관리 API", tags = {"UserRoom"})
@RestController
@RequestMapping("/my")
public class MyRoomController {

    @Autowired
    RoomService roomService;
    @Autowired
    MyRoomService myRoomService;
    @Autowired
    UserService userService;

    //TODO: response 수정 필요
    @GetMapping("/room")
    public ResponseEntity<? extends UserRoomsGetRes> getMyRoom(){
        User user = userService.getUser(2L);

        List<Room> myRooms = myRoomService.getMyRooms(user);

        if(myRooms == null){
            return ResponseEntity.status(404)
                    .body(UserRoomsGetRes.of(404, "Fail to add", null));
        }
        return ResponseEntity.status(200)
                .body(UserRoomsGetRes.of(200, "Success", myRooms));
    }

    @PostMapping("/room/add")
    public ResponseEntity<? extends MyRoomPostRes> addMyRoom(@RequestBody MyRoomPostReq myRoomInfo){
        Long roomId = myRoomInfo.getRoomId();
        Room room = roomService.getRoomByRoomId(roomId);
        User user = userService.getUser(1L);

        boolean isAdded = myRoomService.addMyRoom(user, room);

        if(!isAdded){
            return ResponseEntity.status(404)
                    .body(MyRoomPostRes.of(404, "Fail to add", false));
        }
        return ResponseEntity.status(200)
                .body(MyRoomPostRes.of(200, "Success", true));
    }

    //TODO: 나의 방 삭제

    //TODO: 관심 방 목록 조회

    @PostMapping("/like/add")
    public ResponseEntity<? extends MyRoomPostRes> addInterestRoom(@RequestBody MyRoomPostReq myRoomInfo){

        Long roomId = myRoomInfo.getRoomId();
        Room room = roomService.getRoomByRoomId(roomId);
        User user = userService.getUser(1L);

        boolean isAdded = myRoomService.addInterestRoom(user, room);

        if(!isAdded){
            return ResponseEntity.status(404)
                    .body(MyRoomPostRes.of(404, "Fail to add", false));
        }
        return ResponseEntity.status(200)
                .body(MyRoomPostRes.of(200, "Success", true));
    }

    //TODO: 관심 방 삭제
}
