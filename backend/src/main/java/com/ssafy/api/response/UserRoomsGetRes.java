package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("JoinRoomsGetResponse")
public class UserRoomsGetRes extends BaseResponseBody {

    @ApiModelProperty(name = "방 목록")
    List<UserRoomRes> rooms = new ArrayList<>();

    public static UserRoomsGetRes of(Integer status, String message, List<Room> rooms){
        UserRoomsGetRes res = new UserRoomsGetRes();

        res.setStatusCode(status);
        res.setMessage(message);
        res.setRooms(rooms);

        return res;
    }

    public void setRooms(List<Room> rooms){
        for(Room room : rooms){
            this.rooms.add(UserRoomRes.of(room));
        }
    }
}
