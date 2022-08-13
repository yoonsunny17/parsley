package com.ssafy.api.response;

import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDate;

@Data
@ApiModel("RoomUserResResponse")
public class RoomUserRes {
    @ApiModelProperty(name = "유저 ID", example = "123")
    Long id;

    @ApiModelProperty(name = "유저 닉네임", example = "유교보이")
    String name;


    public static RoomUserRes of (User user) {
        RoomUserRes res = new RoomUserRes();
        res.setId(user.getId());
        res.setName(user.getName());
        return res;
    }
}
