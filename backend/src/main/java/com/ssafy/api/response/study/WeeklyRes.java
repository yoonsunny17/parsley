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
    double hour;

    public static WeeklyRes of(String day, double hour){
        WeeklyRes res = new WeeklyRes();

        res.day = day;
        res.hour = hour;

        return res;
    }
}
