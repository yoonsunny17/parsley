package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@ApiModel("RoomGetResponse")
public class RoomGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "방 정보")
    RoomRes roomInfo;
    @ApiModelProperty(name = "비밀번호 모달 필요 여부")
    boolean isNecessary;
    @ApiModelProperty(name = "수정, 삭제 가능 여부")
    boolean isPossible;
    @ApiModelProperty(name = "현재 유저")
    Long userId;

    public static RoomGetRes of(Integer statusCode, String message, Room roomInfo, boolean isNecessary, boolean isPossible, Long userId) {
        RoomGetRes res = new RoomGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setRoomInfo(roomInfo);
        res.setNecessary(isNecessary);
        res.setPossible(isPossible);
        res.setUserId(userId);
        return res;
    }

    public void setRoomInfo(Room room) {
        this.roomInfo = RoomRes.of(room);
    }
}
