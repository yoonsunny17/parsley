package com.ssafy.api.response.study;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("DailyGoalCreatePostResponse")
public class GoalCreatePostRes extends BaseResponseBody {

    @ApiModelProperty(name = "daily goal id")
    Long dailyGoalId;

    public static GoalCreatePostRes of(Integer statusCode, String message, Long dailyGoalId){
        GoalCreatePostRes res = new GoalCreatePostRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setDailyGoalId(dailyGoalId);

        return res;
    }
}
