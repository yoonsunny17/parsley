package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserHerbBookAddPostRes")
public class UserHerbBookAddPostRes extends BaseResponseBody {
    @ApiModelProperty(name = "추가 슬리")
    Long addSley;

    public static UserHerbBookAddPostRes of(Integer statusCode, String message, UserHerbBookAddPostRes userHerbBookAddPostRes){
        UserHerbBookAddPostRes res = userHerbBookAddPostRes;
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
