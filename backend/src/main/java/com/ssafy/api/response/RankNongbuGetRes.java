package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Map;

@Data
@ApiModel("RankNongbuGetRes")
public class RankNongbuGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "농부왕 Top 5 정보")
    Map<String, Double> topRank;

    @ApiModelProperty(name = "나의 등수")
    Map<String, Long> myRank;

    public static RankNongbuGetRes of(Integer statusCode, String message, Map<String, Double> topRank, Map<String, Long> myRank) {
        RankNongbuGetRes res = new RankNongbuGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setTopRank(topRank);
        res.setMyRank(myRank);
        return res;
    }
}
