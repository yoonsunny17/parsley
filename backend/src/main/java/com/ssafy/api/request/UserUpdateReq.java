package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserUpdateRequest")
public class UserUpdateReq {

    @ApiModelProperty(name = "닉네임", example = "유교보이")
    private String name;
    @ApiModelProperty(name = "상태 메세지", example = "두껍아 두껍아 헌집줄게 밥을 다오")
    private String description;
    @ApiModelProperty(name = "프로필용 도감 아이디", example = "32")
    private int herbBookId;

}