package com.ssafy.api.response.study;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("WeeklyResponse")
public class WeeklyRes{

    @ApiModelProperty(name = "day of the week")
    String day;
    @ApiModelProperty(name = "study time")
    Long time;

    public static WeeklyRes of(String day, Long time){
        WeeklyRes res = new WeeklyRes();

        res.day = day;
        res.time = time;

        return res;
    }
}
