package com.ssafy.api.response.user;

import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDate;

@Data
@ApiModel("UserResponse")
public class UserRes {
    @ApiModelProperty(name = "유저 ID", example = "123")
    Long id;

    @ApiModelProperty(name = "유저 닉네임", example = "유교보이")
    String name;

    @ApiModelProperty(name = "유저 가입일", example = "2022-08-08")
    LocalDate regDate;

    @ApiModelProperty(name = "유저 설명", example = "화이팅")
    String description;

    @ApiModelProperty(name = "프로필 허브 이름", example = "https://via.placeholder.com/150/")
    String herbBookName;

    @ApiModelProperty(name = "프로필 허브 타입", example = "RARE")
    String herbBookType;

    @ApiModelProperty(name = "프로필 허브 소개", example = "모두함께 PARSLEY!")
    String herbBookDescription;

    @ApiModelProperty(name = "프로필 허브 이미지url", example = "https://via.placeholder.com/150/")
    String herbBookImageUrl;

    @ApiModelProperty(name = "D-DAY", example = "2022-08-12")
    LocalDate dDay;

    @ApiModelProperty(name = "현재 보유 슬리", example = "10000")
    long currentSley;

    @ApiModelProperty(name = "현재 보유 도감 포인트", example = "9500")
    long currentBookPoint;

    public static UserRes of (User user) {
        UserRes res = new UserRes();
        res.setId(user.getId());
        res.setName(user.getName());
        res.setRegDate(user.getRegDate());
        res.setDescription(user.getDescription());
        res.setHerbBookName(user.getProfileHerb().getName());
        res.setHerbBookType(user.getProfileHerb().getHerbType().toString());
        res.setHerbBookDescription(user.getProfileHerb().getDescription());
        res.setHerbBookImageUrl(user.getProfileHerb().getImageUrl());
        res.setDDay(user.getDDay());
        res.setCurrentSley(user.getCurrentSley());
        res.setCurrentBookPoint(user.getCurrentBookPoint());
        return res;
    }
}
