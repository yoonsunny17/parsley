package com.ssafy.api.controller;

import com.ssafy.api.request.MyRoomPostReq;
import com.ssafy.api.response.MyRoomPostRes;
import com.ssafy.api.response.UserRoomsGetRes;
import com.ssafy.api.service.JwtService;
import com.ssafy.api.service.MyRoomService;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@Api(value = "사용자별 방 관리 API", tags = {"UserRoom"})
@RestController
@RequestMapping("/my")
public class MyRoomController {

    @Autowired
    private MyRoomService myRoomService;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/room")
    @ApiOperation(value = "나의 방 목록 조회", notes = "사용자가 참여했던 방 목록을 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "나의 방 목록 조회 성공"),
            @ApiResponse(code = 400, message = "나의 방 목록 조회 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends UserRoomsGetRes> getMyRoom(){
        Long userId = jwtService.getUserId();

        List<Room> myRooms = myRoomService.getMyRooms(userId);

        if(myRooms == null){
            return ResponseEntity.status(404)
                    .body(UserRoomsGetRes.of(404, "Fail to find", null));
        }
        return ResponseEntity.status(200)
                .body(UserRoomsGetRes.of(200, "Success", myRooms));
    }

    @PostMapping("/room/add")
    @ApiOperation(value = "나의 방 추가", notes = "사용자가 스터디룸에 처음 참여하면 true를 이미 참여했던 적이 있으면 false를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "나의 방 추가 성공"),
            @ApiResponse(code = 200, message = "나의 방 추가 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends MyRoomPostRes> addMyRoom(@RequestBody @Valid MyRoomPostReq myRoomInfo){

        Long userId = jwtService.getUserId();

        boolean isAdded = myRoomService.addMyRoom(userId, myRoomInfo);

        if(!isAdded){
            return ResponseEntity.status(404)
                    .body(MyRoomPostRes.of(404, "Fail to add", false));
        }
        return ResponseEntity.status(200)
                .body(MyRoomPostRes.of(200, "Success", true));
    }

    @PostMapping("/room/delete")
    @ApiOperation(value = "나의 방 삭제", notes = "사용자가 나의 방에서 스터디룸을 삭제에 성공하면 true를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "나의 방 삭제 성공"),
            @ApiResponse(code = 404, message = "나의 방 삭제 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends MyRoomPostRes> deleteMyRoom(@RequestBody @Valid MyRoomPostReq myRoomInfo){

        Long userId = jwtService.getUserId();

        boolean isSuccess = myRoomService.deleteMyRoom(userId, myRoomInfo);

        if(!isSuccess){
            return ResponseEntity.status(404)
                    .body(MyRoomPostRes.of(404, "Fail to delete", false));
        }else{
            return ResponseEntity.status(200)
                    .body(MyRoomPostRes.of(200, "Success",true));
        }
    }

    @GetMapping("/like")
    @ApiOperation(value = "관심 방 목록 조회", notes = "사용자가 관심을 표시한 방 목록을 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "관심 방 목록 조회 성공"),
            @ApiResponse(code = 404, message = "관심 방 목록 조회 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends UserRoomsGetRes> getInterestRoom(){
        Long userId = jwtService.getUserId();

        List<Room> myRooms = myRoomService.getInterestRooms(userId);

        if(myRooms == null){
            return ResponseEntity.status(404)
                    .body(UserRoomsGetRes.of(404, "Fail to find", null));
        }
        return ResponseEntity.status(200)
                .body(UserRoomsGetRes.of(200, "Success", myRooms));
    }

    @PostMapping("/like/add")
    @ApiOperation(value = "관심 방 추가", notes = "사용자가 스터디룸에 관심 표시를 하면 true를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "관심 방 추가 성공"),
            @ApiResponse(code = 404, message = "관심 방 추가 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends MyRoomPostRes> addInterestRoom(@RequestBody @Valid MyRoomPostReq myRoomInfo){

        Long userId = jwtService.getUserId();

        boolean isAdded = myRoomService.addInterestRoom(userId, myRoomInfo);

        if(!isAdded){
            return ResponseEntity.status(404)
                    .body(MyRoomPostRes.of(404, "Fail to add", false));
        }
        return ResponseEntity.status(200)
                .body(MyRoomPostRes.of(200, "Success", true));
    }

    @PostMapping("/like/delete")
    @ApiOperation(value = "관심 방 삭제", notes = "사용자가 관심 목록에서 스터디룸을 삭제에 성공하면 true를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "관심 방 삭제 성공"),
            @ApiResponse(code = 404, message = "관심 방 삭제 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends MyRoomPostRes> deleteInterestRoom(@RequestBody @Valid MyRoomPostReq myRoomInfo){

        Long userId = jwtService.getUserId();

        boolean isSuccess = myRoomService.deleteInterestRoom(userId, myRoomInfo);

        if(!isSuccess){
            return ResponseEntity.status(404)
                    .body(MyRoomPostRes.of(404, "Fail to delete", false));
        }else{
            return ResponseEntity.status(200)
                    .body(MyRoomPostRes.of(200, "Success",true));
        }
    }
}
