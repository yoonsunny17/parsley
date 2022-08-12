package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@ApiModel("DailyGoalGetResponse")
public class GoalGetRes extends BaseResponseBody {

    @ApiModelProperty(name = "daily target time")
    int targetTime;

    public static GoalGetRes of(Integer statusCode, String message, int targetTime){
        GoalGetRes res = new GoalGetRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setTargetTime(targetTime);

        return res;
    }
}
