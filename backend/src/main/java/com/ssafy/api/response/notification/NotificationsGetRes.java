package com.ssafy.api.response.notification;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Notification;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("NotificationsGetResponse")
public class NotificationsGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "알림 정보")
    List<NotificationRes> notifications = new ArrayList<>();

    public static NotificationsGetRes of(Integer statusCode, String message, List<Notification> notifications) {
        NotificationsGetRes res = new NotificationsGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setNotifications(notifications);
        return res;
    }

    public void setNotifications(List<Notification> notifications) {
        for(Notification notification: notifications) {
            this.notifications.add(NotificationRes.of(notification));
        }
    }
}
