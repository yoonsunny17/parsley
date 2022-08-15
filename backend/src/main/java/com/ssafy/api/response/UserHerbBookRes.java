package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.Tuple;

@Data
@ApiModel("UserHerbBookResponse")
public class UserHerbBookRes {
    @ApiModelProperty(name = "허브 ID")
    private Integer herbBookId;

    @ApiModelProperty(name = "수확 개수")
    private int count;

    public static UserHerbBookRes of(Tuple userHerbBook){
        UserHerbBookRes res = new UserHerbBookRes();
        res.setHerbBookId(Integer.parseInt(String.valueOf(userHerbBook.get(0))));
        res.setCount(Integer.parseInt(String.valueOf(userHerbBook.get(1))));
        return res;
    }
}
