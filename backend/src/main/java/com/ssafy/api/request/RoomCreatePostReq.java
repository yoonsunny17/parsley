package com.ssafy.api.request;

import com.ssafy.db.entity.Hashtag;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@ApiModel("RoomCreatePostRequest")
public class RoomCreatePostReq {
    @ApiModelProperty(name = "방 이름", example = "coding_with_me")
    String name;

//    @ApiModelProperty(name = "방 커버 이미지 URL", example = "https://images.unsplash.com/photo-1622653533660-a1538fe8424c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")
//    MultipartFile imageUrl;

    @ApiModelProperty(name = "방 모드", example = "1")
    int mode; // 0: Finger, 1: Face

    @ApiModelProperty(name = "방 설명", example = "Let's gather up and code")
    String description;

    @ApiModelProperty(name = "방 최대 참가 인원 수", example = "4")
    int maxPopulation;

    @ApiModelProperty(name = "공개 여부", example = "1")
    boolean isPublic;

    @ApiModelProperty(name = "비밀번호", example = "1234", notes = "NULL 가능")
    String password;

    @ApiModelProperty(name = "해시태그", example = "코딩테스트")
    List<String> hashtags;

}
