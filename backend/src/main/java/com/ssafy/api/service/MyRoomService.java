package com.ssafy.api.service;

import com.ssafy.api.request.MyRoomPostReq;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class MyRoomService {

    @Autowired
    private RoomRepository roomRepository;


    @Transactional
    public boolean addMyRoom(User user, MyRoomPostReq myRoomInfo){

        Room room = roomRepository.findByRoomId(myRoomInfo.getRoomId());

        if(user.getJoinRooms().contains(room)){
            return false;
        }else{
            user.addUserRoom(room);
            return true;
        }
    }

    @Transactional
    public boolean addInterestRoom(User user, MyRoomPostReq myRoomInfo){

        Room room = roomRepository.findByRoomId(myRoomInfo.getRoomId());

        if(user.getInterestRooms().contains(room)){
            return false;
        }else{
            user.getInterestRooms().add(room);
            return true;
        }
    }

    public List<Room> getMyRooms(User user){
        return user.getJoinRooms();
    }

    public List<Room> getInterestRooms(User user){
        return user.getInterestRooms();
    }

    @Transactional
    public boolean deleteMyRoom(User user, MyRoomPostReq myRoomInfo){

        List<Room> rooms = user.getJoinRooms();
        Room room = roomRepository.findByRoomId(myRoomInfo.getRoomId());

        if(rooms.contains(room)){
            rooms.remove(room);
            return true;
        }else{
            return false;
        }
    }

    @Transactional
    public boolean deleteInterestRoom(User user, MyRoomPostReq myRoomInfo){

        List<Room> rooms = user.getInterestRooms();
        Room room = roomRepository.findByRoomId(myRoomInfo.getRoomId());

        if(rooms.contains(room)){
            rooms.remove(room);
            return true;
        }else{
            return false;
        }
    }
}
