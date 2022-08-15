package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@ApiModel("HerbAddPostResponse")
public class HerbAddPostRes extends BaseResponseBody{
    @ApiModelProperty(name = "작물 ID")
    Long herbId;

    public static HerbAddPostRes of(Integer statusCode, String message, Long herbId){
        HerbAddPostRes res = new HerbAddPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setHerbId(herbId);
        return res;
    }
}