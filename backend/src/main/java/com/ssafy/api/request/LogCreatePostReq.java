package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("StudyLogCreatepostRequest")
public class LogCreatePostReq {

    @ApiModelProperty(name = "방 ID", example = "1")
    Long roomId;
    @ApiModelProperty(name = "캠 on/off", example = "0")
    boolean status;

}
