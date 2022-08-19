package com.ssafy.api.response.room;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("RoomPostResponse")
public class RoomPostRes extends BaseResponseBody {
    @ApiModelProperty(name = "방 ID")
    Long roomId;

    public static RoomPostRes of(Integer statusCode, String message, Long roomId) {
        RoomPostRes res = new RoomPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setRoomId(roomId);
        return res;
    }
}

