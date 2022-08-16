package com.ssafy.api.response.farm;

import com.ssafy.db.entity.HerbBook;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.Tuple;
import java.util.Map;

@Data
@ApiModel("UserHerbBookResponse")
public class UserHerbBookRes {
    @ApiModelProperty(name = "도감의 허브")
    private HerbBook herbBook;

    @ApiModelProperty(name = "수확 개수")
    private int count;

    public static UserHerbBookRes of(HerbBook herbBook, int cnt){
        UserHerbBookRes res = new UserHerbBookRes();
        res.setHerbBook(herbBook);
        res.setCount(cnt);
        return res;
    }
}
