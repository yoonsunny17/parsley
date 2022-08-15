package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("RoomPasswordPostRequest")
public class RoomPasswordPostReq {

    @ApiModelProperty(name = "비밀번호", example = "parsley123")
    String password;
}
