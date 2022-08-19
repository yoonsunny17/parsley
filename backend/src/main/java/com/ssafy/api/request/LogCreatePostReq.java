package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@ApiModel("StudyLogCreatepostRequest")
public class LogCreatePostReq {

    @ApiModelProperty(name = "캠 on/off", example = "0")
    boolean status;

}
