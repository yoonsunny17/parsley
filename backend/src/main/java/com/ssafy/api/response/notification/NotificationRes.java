package com.ssafy.api.response.notification;

import com.ssafy.db.entity.Notification;
import com.ssafy.db.entity.NotificationType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@ApiModel("NotificationResponse")
public class NotificationRes {
    @ApiModelProperty(name = "날짜")
    private LocalDateTime date;

    @ApiModelProperty(name = "내역")
    private String content;

    @ApiModelProperty(name = "금액")
    private int value;

    @ApiModelProperty(name = "타입", example = "0")
    private int type;   //0: sldy, 1: point

    public static NotificationRes of(Notification notification){
        if(notification == null) return null;

        NotificationRes res = new NotificationRes();
        res.setDate(notification.getDate());
        res.setContent(notification.getContent());
        res.setValue(notification.getValue());
        res.setType(notification.getNotificationType() == NotificationType.SLEY ? 0 : 1);
        return res;
    }
}
