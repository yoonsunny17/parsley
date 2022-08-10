package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Auth;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("AuthResponse")
public class AuthRes extends BaseResponseBody {
    @ApiModelProperty(name = "Access Token")
    private String accessToken;

    @ApiModelProperty(name="is completed")
    private boolean isCompleted;

    public static AuthRes of(Integer statusCode, String message, String accessToken, boolean isCompleted) {
        AuthRes res = new AuthRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        res.setCompleted(isCompleted);
        return res;
    }
}
