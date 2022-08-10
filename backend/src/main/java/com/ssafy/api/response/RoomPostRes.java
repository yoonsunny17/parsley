package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@ApiModel("RoomPostResponse")
public class RoomPostRes extends BaseResponseBody {
    @ApiModelProperty(name = "t/f")
    boolean isTrue;

    public static RoomPostRes of(Integer statusCode, String message, boolean isTrue) {
        RoomPostRes res = new RoomPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setTrue(isTrue);
        return res;
    }
}

