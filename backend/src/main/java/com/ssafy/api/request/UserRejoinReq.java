package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserRejoinRequest")
public class UserRejoinReq {
    @ApiModelProperty(name = "user id", example = "유교보이")
    private Long userId;
}
