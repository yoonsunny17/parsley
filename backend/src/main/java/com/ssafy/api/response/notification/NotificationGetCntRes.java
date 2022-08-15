package com.ssafy.api.response.notification;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("NotificationGetCntResponse")
public class NotificationGetCntRes extends BaseResponseBody {
    @ApiModelProperty(name = "확인하지 않은 알림 개수")
    int uncheckCnt;

    public static NotificationGetCntRes of(Integer statusCode, String message, int uncheckCnt) {
        NotificationGetCntRes res = new NotificationGetCntRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUncheckCnt(uncheckCnt);
        return res;
    }

}
