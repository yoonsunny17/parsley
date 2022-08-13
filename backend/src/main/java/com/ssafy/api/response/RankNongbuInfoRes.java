package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("RankNongbuInfoRes")
public class RankNongbuInfoRes {
    @ApiModelProperty(name = "닉네임", example = "익명의 사용자 1")
    String name;

    @ApiModelProperty(name = "도감 포인트", example = "1000")
    Double score;

    @ApiModelProperty(name = "등수", example = "-1")
    Long rank;

    public static RankNongbuInfoRes of(String name, Double score, Long rank) {
        RankNongbuInfoRes res = new RankNongbuInfoRes();
        res.setName(name);
        res.setScore(score);
        res.setRank(rank);
        return res;
    }
}
