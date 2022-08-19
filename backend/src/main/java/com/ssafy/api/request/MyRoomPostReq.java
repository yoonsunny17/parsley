package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@ApiModel("MyRoomPostRequest")
public class MyRoomPostReq {

    @ApiModelProperty(name = "방 번호", example = "1")
    Long roomId;
}
