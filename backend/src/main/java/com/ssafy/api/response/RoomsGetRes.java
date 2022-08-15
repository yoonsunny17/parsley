package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("RoomsGetResponse")
public class RoomsGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "방 정보")
    List<RoomRes> roomsInfo = new ArrayList<>();

    public static RoomsGetRes of(Integer statusCode, String message, List<Room> roomsInfo) {
        RoomsGetRes res = new RoomsGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        if(roomsInfo != null){
            res.setRoomsInfo(roomsInfo);
        }
        return res;
    }

    public void setRoomsInfo(List<Room> roomsInfo) {
        for(Room room: roomsInfo) {
            this.roomsInfo.add(RoomRes.of(room));
        }
    }
}
