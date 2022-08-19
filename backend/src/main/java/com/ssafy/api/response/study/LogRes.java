package com.ssafy.api.response.study;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@ApiModel("LogResponse")
public class LogRes {

    @ApiModelProperty(name = "시작 로그")
    String startTime;

    @ApiModelProperty(name = "종료 로그")
    String endTime;

    public static LogRes of(LocalDateTime startTime, LocalDateTime endTime){
        if(startTime == null || endTime == null){
            return null;
        }

        LogRes res = new LogRes();
        res.setStartTime(startTime.toString());
        res.setEndTime(endTime.toString());

        return res;

    }
}
