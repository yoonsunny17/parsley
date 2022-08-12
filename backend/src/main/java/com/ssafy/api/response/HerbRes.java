package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Data
@ApiModel("HerbResponse")
public class HerbRes {
	@ApiModelProperty(name = "허브 ID")
	Long herbId;

	@ApiModelProperty(name="작물 위치")
	int position;

	@ApiModelProperty(name = "씨앗 ID")
	int itemSeedId;

	@ApiModelProperty(name = "물 ID")
	int itemWaterId;

	@ApiModelProperty(name = "비료 ID")
	int itemFertilizerId;

	@ApiModelProperty(name = "남은 시간")
	int leftTime;
}
