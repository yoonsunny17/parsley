package com.ssafy.api.response.user;

import com.ssafy.common.model.response.BaseResponseBody;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserPostResponse")
public class UserPostRes extends BaseResponseBody{
	@ApiModelProperty(name="유저 ID")
	Long userId;
	
//	public static UserPostRes of(User user) {
//		UserPostRes res = new UserPostRes();
//		res.setUserId(user.getUserId());
//		return res;
//	}
	public static UserPostRes of(Integer statusCode, String message, Long userId) {
		UserPostRes res = new UserPostRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setUserId(userId);
		return res;
	}
}