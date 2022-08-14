package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDate;

@Data
@ApiModel("ddayPostResponse")
public class DDayPostReq {

    @ApiModelProperty(name = "디데이", example = "2022-08-19")
    LocalDate dDay;
}
