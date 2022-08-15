package com.ssafy.api.response.study;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.LinkedList;
import java.util.List;

@Data
@ApiModel("WeeklyStudyTimeGetResponse")
public class WeeklyStudyGetRes extends BaseResponseBody {

    @ApiModelProperty(name = "weekly study time")
    List<WeeklyRes> week = new LinkedList<>();
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

    public void setWeek(List<Long> week){

        String[] days = {"월", "화", "수", "목", "금", "토", "일"};

        if(week != null){
            for(int i=0; i<week.size(); i++){
                this.week.add(WeeklyRes.of(days[i], week.get(i)/60));
            }
            for(int i=week.size(); i<7; i++){
                this.week.add(WeeklyRes.of(days[i], 0L));
            }
        }
    }
}
