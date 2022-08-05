package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@ApiModel("UserRequest")
public class UserReq {

    @ApiModelProperty(name = "닉네임", example = "유교보이")
    private String name;
    @ApiModelProperty(name = "상태 메세지", example = "두껍아 두껍아 헌집줄게 밥을 다오")
    private String description;
    @ApiModelProperty(name = "프로필 이미지", example = "https://via.placeholder.com/150/")
    private String profileImgUrl;

}