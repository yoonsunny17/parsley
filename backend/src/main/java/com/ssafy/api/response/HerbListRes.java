package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("HerbListRes")
public class HerbListRes extends BaseResponseBody{
	private List<HerbRes> herbs;
	
	public static HerbListRes of(Integer statusCode, String message, List<HerbRes> herbs) {
		HerbListRes res = new HerbListRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setHerbs(herbs);
		return res;
	}
}
