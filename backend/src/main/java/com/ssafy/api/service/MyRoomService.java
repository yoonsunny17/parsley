package com.ssafy.api.service;

import com.ssafy.api.request.MyRoomPostReq;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.MyRoomRepository;
import com.ssafy.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class MyRoomService {

    @Autowired
    private MyRoomRepository myRoomRepository;


    @Transactional
    public boolean addMyRoom(User user, Room room){
        if(user.getJoinRooms().contains(room)){
            return false;
        }else{
            user.addUserRoom(room);
            return true;
        }
    }

    @Transactional
    public boolean addInterestRoom(User user, Room room){
        if(user.getInterestRooms().contains(room)){
            return false;
        }else{
            user.getInterestRooms().add(room);
            return true;
        }
    }


}
