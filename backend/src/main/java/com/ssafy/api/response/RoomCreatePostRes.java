package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RoomCreatePostResponse")
public class RoomCreatePostRes extends BaseResponseBody {
    @ApiModelProperty(name = "방 ID")
    Long roomId;

    public static RoomCreatePostRes of(Integer statusCode, String message, Long roomId) {
        RoomCreatePostRes res = new RoomCreatePostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setRoomId(roomId);
        return res;
    }
}

