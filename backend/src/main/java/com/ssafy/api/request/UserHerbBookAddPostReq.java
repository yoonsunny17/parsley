package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserLoginPostRequest")
public class UserHerbBookAddPostReq {
    @ApiModelProperty(name="유저 허브북 ID", example="1")
    Long herbBookId;
}
