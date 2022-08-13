package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@ApiModel("RankNongbuGetRes")
public class RankNongbuGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "농부왕 Top 5 정보")
    List<RankNongbuInfoRes> topRank;

    @ApiModelProperty(name = "나의 등수")
    RankNongbuInfoRes myRank;

    public static RankNongbuGetRes of(Integer statusCode, String message, List<RankNongbuInfoRes> topRank, RankNongbuInfoRes myRank) {
        RankNongbuGetRes res = new RankNongbuGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setTopRank(topRank);
        res.setMyRank(myRank);
        return res;
    }
}
