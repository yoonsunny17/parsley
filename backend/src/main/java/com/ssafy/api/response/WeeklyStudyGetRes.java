package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedList;
import java.util.List;

@Data
@ApiModel("WeeklyStudyTimeGetResponse")
public class WeeklyStudyGetRes extends BaseResponseBody {

    @ApiModelProperty(name = "weekly study time")
    List<Long> week = new LinkedList<>();
    @ApiModelProperty(name = "last week study time")
    Long lastWeek;

    public static WeeklyStudyGetRes of(Integer statusCode, String message, List<Long> week, long lastWeek){
        WeeklyStudyGetRes res = new WeeklyStudyGetRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setWeek(week);
        res.setLastWeek(lastWeek);

        return res;
    }
}
