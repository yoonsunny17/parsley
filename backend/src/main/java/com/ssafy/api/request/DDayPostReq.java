package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDate;

@Data
@ApiModel("ddayPostResponse")
public class DDayPostReq {

    @JsonProperty("dDay")
    @ApiModelProperty(name = "디데이", example = "2022-08-19")
    String dDay;
}
