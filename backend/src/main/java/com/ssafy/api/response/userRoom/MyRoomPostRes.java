package com.ssafy.api.response.userRoom;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("MyRoomPostResponse")
public class MyRoomPostRes extends BaseResponseBody {

    @ApiModelProperty(name = "is add")
    boolean isAdded;

    public static MyRoomPostRes of(Integer status, String message, boolean isAdded){
        MyRoomPostRes res = new MyRoomPostRes();

        res.setStatusCode(status);
        res.setMessage(message);
        res.setAdded(isAdded);

        return res;
    }

}
