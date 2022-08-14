package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("RankInfoRes")
public class RankInfoRes {
    @ApiModelProperty(name = "닉네임", example = "익명의 사용자 1")
    String name;

    @ApiModelProperty(name = "도감 포인트", example = "1000")
    Double score;

    @ApiModelProperty(name = "등수", example = "-1")
    Long rank;

    public static RankInfoRes of(String name, Double score, Long rank) {
        RankInfoRes res = new RankInfoRes();
        res.setName(name);
        res.setScore(score);
        res.setRank(rank);
        return res;
    }
}
