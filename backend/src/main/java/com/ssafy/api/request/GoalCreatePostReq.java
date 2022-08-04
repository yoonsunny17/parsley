package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@ApiModel("DailyGoalCreatePostRequest")
public class GoalCreatePostReq {

    @ApiModelProperty(name = "목표 시간", example = "5")
    int targetTime;
}
