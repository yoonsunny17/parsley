package com.ssafy.api.response.study;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDate;

@Data
@ApiModel("DDay Get Response")
public class DDayGetRes extends BaseResponseBody {

    @ApiModelProperty(name = "디데이")
    LocalDate dDay;

    public static DDayGetRes of(Integer status, String message, LocalDate dDay){
        DDayGetRes res = new DDayGetRes();

        res.setStatusCode(status);
        res.setMessage(message);
        res.setDDay(dDay);

        return res;
    }
}
