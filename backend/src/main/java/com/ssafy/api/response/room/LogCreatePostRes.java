package com.ssafy.api.response.room;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("StudyLogCreatePostResponse")
public class LogCreatePostRes extends BaseResponseBody {

    @ApiModelProperty(name = "daily study log id")
    Long dailyStudyLogId;

    public static LogCreatePostRes of(Integer statusCode, String message, Long dailyStudyLogId){
        LogCreatePostRes res = new LogCreatePostRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setDailyStudyLogId(dailyStudyLogId);

        return res;
    }
}
