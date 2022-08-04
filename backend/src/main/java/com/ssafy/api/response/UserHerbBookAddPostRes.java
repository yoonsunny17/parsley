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
    @ApiModelProperty(name = "유저 도감 ID")
    Long userHerbBookId;

    public static UserHerbBookAddPostRes of(Integer statusCode, String message, Long userHerbBookId){
        UserHerbBookAddPostRes res = new UserHerbBookAddPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserHerbBookId(userHerbBookId);
        return res;
    }
}
