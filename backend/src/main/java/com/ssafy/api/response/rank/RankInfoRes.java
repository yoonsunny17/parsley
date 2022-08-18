package com.ssafy.api.response.rank;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("RankInfoRes")
public class RankInfoRes {
    @ApiModelProperty(name = "닉네임", example = "익명의 사용자 1")
    String name;

    @ApiModelProperty(name = "상태 메시지", example = "슬리파는파슬리가아니지만파슬리는슬리파가아니다")
    String description;

    @ApiModelProperty(name = "도감 포인트", example = "1000")
    Double score;

    @ApiModelProperty(name = "등수", example = "-1")
    Long rank;

    public static RankInfoRes of(String name, String description, Double score, Long rank) {
        RankInfoRes res = new RankInfoRes();
        res.setName(name);
        res.setDescription(description);
        res.setScore(score);
        res.setRank(rank);
        return res;
    }
}
