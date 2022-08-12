package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.DailyStudyLog;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("LogGetResponse")
public class LogGetRes extends BaseResponseBody {

    @ApiModelProperty(name = "daily study Log List")
    List<LogRes> dailyStudyLogs = new ArrayList<>();

    public static LogGetRes of(Integer status, String message, List<DailyStudyLog> dailyStudyLogs){
        LogGetRes res = new LogGetRes();

        res.setStatusCode(status);
        res.setMessage(message);
        res.setDailyStudyLogs(dailyStudyLogs);

        return res;
    }

    public void setDailyStudyLogs(List<DailyStudyLog> dailyStudyLogs){
        for(int i=0; i<dailyStudyLogs.size(); i+=2){
            this.dailyStudyLogs.add(LogRes.of(dailyStudyLogs.get(i).getTime(), dailyStudyLogs.get(i+1).getTime()));
        }
    }
}
