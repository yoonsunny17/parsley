package com.ssafy.api.response.farm;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserHerbBookAddPostResponse")
public class UserHerbBookAddPostRes extends BaseResponseBody {
    @ApiModelProperty(name = "추가 슬리")
    Long addSley;

    @ApiModelProperty(name = "도감 포인트")
    Long addPoint;

    @ApiModelProperty(name = "획득한 허브 이름")
    String herbName;

    @ApiModelProperty(name = "획득한 허브의 이미지")
    String herbImageUrl;

    public static UserHerbBookAddPostRes of(Integer statusCode, String message, UserHerbBookAddPostRes userHerbBookAddPostRes){
        UserHerbBookAddPostRes res = userHerbBookAddPostRes;
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
