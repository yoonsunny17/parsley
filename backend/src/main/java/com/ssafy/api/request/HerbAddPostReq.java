package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.checkerframework.checker.units.qual.A;

@Getter
@Setter
@ApiModel("HerbAddPostReq")
public class HerbAddPostReq {
    @ApiModelProperty(name = "작물 위치", example = "1")
    int position;

    @ApiModelProperty(name = "씨앗 ID", example = "1")
    int itemSeedId;

    @ApiModelProperty(name = "물 ID", example = "1")
    int itemWaterId;

    @ApiModelProperty(name = "비료 ID", example = "1")
    int itemFertilizerId;
}