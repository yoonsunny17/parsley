package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Data
@ApiModel("HerbListResponse")
public class HerbsRes extends BaseResponseBody{
	private List<HerbRes> herbs;
	
	public static HerbsRes of(Integer statusCode, String message, List<HerbRes> herbs) {
		HerbsRes res = new HerbsRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setHerbs(herbs);
		return res;
	}
}
