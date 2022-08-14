package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel("RankGetRes")
public class RankGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "농부왕 Top 5 정보")
    List<RankInfoRes> topRank;

    @ApiModelProperty(name = "나의 등수")
    RankInfoRes myRank;

    public static RankGetRes of(Integer statusCode, String message, List<RankInfoRes> topRank, RankInfoRes myRank) {
        RankGetRes res = new RankGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setTopRank(topRank);
        res.setMyRank(myRank);
        return res;
    }
}
