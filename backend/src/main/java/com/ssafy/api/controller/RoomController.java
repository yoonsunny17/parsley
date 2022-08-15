package com.ssafy.api.controller;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.api.request.RoomPasswordPostReq;
import com.ssafy.api.request.RoomUpdatePostReq;
import com.ssafy.api.response.*;
import com.ssafy.api.service.JwtService;
import com.ssafy.api.service.RoomService;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@Api(value = "방 관리 API", tags = {"Room"})
@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    RoomService roomService;
    @Autowired
    JwtService jwtService;
    @Autowired
    UserService userService;

    @GetMapping
    @ApiOperation(value = "방 목록 조회", notes = "방 목록들을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 목록 조회 성공"),
            @ApiResponse(code = 404, message = "방 목록 조회 실패"),
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
            @ApiResponse(code = 404, message = "방 조회 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends RoomGetRes> getRoom(@PathVariable("room_id") @Valid Long roomId) {

        Room room = roomService.getRoomByRoomId(roomId);

//        Long userId = jwtService.getUserId();
        Long userId = 1L;
        User user = userService.getUserByUserId(userId);

        if (room == null) {
            return ResponseEntity.status(404).body(
                    RoomGetRes.of(404, "Room not found", null, false, false)
            );
        }
        //수정, 삭제 가능 여부
        boolean isPossible = roomService.isHostUser(userId, roomId);
        //비밀번호 모달 필요 여부
        boolean isNecessary = true;
        if(!room.isPublic() && !room.getMembers().contains(user)){
            isNecessary = false;
        }

        return ResponseEntity.status(200).body(
                RoomGetRes.of(200, "Success", room, isNecessary, isPossible)
        );
    }

    @PostMapping("/create")
    @ApiOperation(value = "방 생성", notes = "생성된 방 id 값을 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "방 생성 성공"),
            @ApiResponse(code = 500, message = "방 생성 실패")
    })
    public ResponseEntity<? extends RoomPostRes> createPost(
            @RequestPart(value = "roomInfo") @ApiParam(value = "방 생성 정보", required = true) @Valid RoomCreatePostReq roomInfo,
            @RequestPart(value = "imgUrl") @ApiParam(value = "방 이미지", required = true) @Valid MultipartFile multipartFile) {

        Long userId = 1L;
//        Long userId = jwtService.getUserId();
        Room room = roomService.createRoom(userId, roomInfo, multipartFile);


        if (room == null) {
            return ResponseEntity.status(500).body(
                    RoomPostRes.of(500, "Fail to create", false)
            );
        }

        return ResponseEntity.status(201).body(
                RoomPostRes.of(201, "Success", true));
    }


    @GetMapping("/create")
    @ApiOperation(value = "방 생성", notes = "인기 해시태그 5개를 가져온다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "방 생성 성공"),
            @ApiResponse(code = 500, message = "방 생성 실패")
    })
    public ResponseEntity<? extends HashtagGetRes> getTopHashtag(){

        List<String> hashtags = roomService.getHashtags();

        return ResponseEntity.status(200).body(
                HashtagGetRes.of(200, "Success", hashtags)
        );
    }

    @PostMapping("/{room_id}/update")
    @ApiOperation(value = "방 수정", notes = "방 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "방 수정 성공"),
            @ApiResponse(code = 500, message = "방 수정 실패")
    })
    public ResponseEntity<? extends RoomPostRes> update(
            @PathVariable("room_id") Long roomId,
            @RequestPart(value = "roomInfo") @ApiParam(value = "방 수정 정보", required = true) @Valid RoomUpdatePostReq roomInfo,
            @RequestPart(value = "imgUrl") @ApiParam(value = "방 이미지", required = true) @Valid MultipartFile multipartFile) {
        Room room = roomService.updateRoom(roomId, roomInfo, multipartFile);
        if (room == null) {
            return ResponseEntity.status(500).body(
                    RoomPostRes.of(500, "Room not found", false)
            );
        }

        return ResponseEntity.status(201).body(
                RoomPostRes.of(201, "Success", true)
        );
    }

    @PostMapping("/{room_id}/delete")
    @ApiOperation(value = "방 삭제", notes = "방을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "방 삭제 성공"),
            @ApiResponse(code = 500, message = "방 삭제 실패")
    })
    public ResponseEntity<? extends RoomPostRes> delete(@PathVariable("room_id") @Valid Long roomId,
                                                        @RequestBody @ApiParam(value = "비밀번호", required = true) @Valid RoomPasswordPostReq passwordInfo) {

//        Long userId = jwtService.getUserId();
        Long userId = 1L;
        boolean isSuccess = roomService.deleteRoom(userId, roomId, passwordInfo);
        if (!isSuccess) {
            return ResponseEntity.status(500).body(
                    RoomPostRes.of(500, "Unable to delete room", false)
            );
        }

        return ResponseEntity.status(201).body(
                RoomPostRes.of(201, "Success", true)
        );
    }

    @PostMapping("/{room_id}/check")
    @ApiOperation(value = "비밀번호 확인", notes = "비밀번호 일치 여부를 확인한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "비밀번호 일치"),
            @ApiResponse(code = 204, message = "비밀번호 불일치"),     //TODO: 서버 코드
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends RoomPostRes> checkPassword(@RequestBody @ApiParam(value = "비밀번호", required = true) @Valid RoomPasswordPostReq passwordInfo){

        boolean isTrue = roomService.isCorrectPwd(passwordInfo);

        if(!isTrue){
            return ResponseEntity.status(204).body(
                    RoomPostRes.of(204, "Passwords do not match", false)
            );
        }else{
            return ResponseEntity.status(201).body(
                    RoomPostRes.of(201, "Passwords match", true)
            );
        }
    }

    // TODO: 방 검색
    @GetMapping("/search")
    @ApiOperation(value = "방 검색 목록 조회", notes = "방 검색 목록들을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 검색 목록 조회 성공"),
            @ApiResponse(code = 404, message = "방 검색 목록 조회 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends RoomsGetRes> searchRooms(@RequestParam("search_word") String search){
        List<Room> rooms = roomService.searchRooms(search);

        if(rooms == null){
            return ResponseEntity.status(404).body(
                    RoomsGetRes.of(404, "Fail", null)
            );
        }else{
            return ResponseEntity.status(200).body(
                    RoomsGetRes.of(200, "Success", rooms)
            );
        }
    }
}