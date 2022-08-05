package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("HerbBookRes")
public class HerbBookRes {
    @ApiModelProperty(name = "허브 ID")
    private Integer herbBookId;

    @ApiModelProperty(name = "수확 개수")
    private int count;
}
