package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("MyRoomPostRequest")
public class MyRoomPostReq {

    @ApiModelProperty(name = "방 번호", example = "1")
    Long roomId;
}
