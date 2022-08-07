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

    public static RoomGetRes of(Integer statusCode, String message, Room roomInfo) {
        RoomGetRes res = new RoomGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setRoomInfo(roomInfo);
        return res;
    }

    public void setRoomInfo(Room room) {
        this.roomInfo = RoomRes.of(room);
    }
}
