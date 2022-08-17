package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel("RoomCreatePostRequest")
public class RoomCreatePostReq {
    @ApiModelProperty(name = "방 이름", example = "coding_with_me")
    String name;

    @ApiModelProperty(name = "방 모드", example = "1")
    int mode; // 0: Finger, 1: Face

    @ApiModelProperty(name = "방 설명", example = "Let's gather up and code")
    String description;

    @ApiModelProperty(name = "방 최대 참가 인원 수", example = "4")
    int maxPopulation;

    @JsonProperty("isPublic")
    @ApiModelProperty(name = "공개 여부", example = "1")
    boolean isPublic;

    @ApiModelProperty(name = "비밀번호", example = "1234", notes = "NULL 가능")
    String password;

    @ApiModelProperty(name = "해시태그", example = "코딩테스트")
    List<String> hashtags;

}
