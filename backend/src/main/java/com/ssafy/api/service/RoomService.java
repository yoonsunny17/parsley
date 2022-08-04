package com.ssafy.api.service;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.api.request.RoomUpdatePostReq;
import com.ssafy.db.entity.Mode;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.RoomHashtag;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.function.Consumer;

@Service
@Transactional(readOnly = true)
public class RoomService {
    @Autowired
    RoomRepository roomRepository;

    @Transactional
    public Room createRoom(RoomCreatePostReq roomInfo) {
        Room room = new Room();
        room.setName(roomInfo.getName());
        room.setMode(roomInfo.getMode() == 0 ? Mode.FINGER : Mode.FACE);
        room.setImageUrl(roomInfo.getImageUrl());
        room.setDescription(roomInfo.getDescription());
        room.setMaxPopulation(roomInfo.getMaxPopulation());
        room.setPublic(roomInfo.isPublic());
        room.setPassword(roomInfo.getPassword());

        roomRepository.save(room);
        return room;
    }

    public List<Room> getRooms() {
        return roomRepository.findRooms();
    }

    public Room getRoomByRoomId(Long roomId) {
        return roomRepository.findByRoomId(roomId);
    }

    @Transactional
    public Room updateRoom(Long roomId, RoomUpdatePostReq newRoomInfo) {
        Room room = roomRepository.findByRoomId(roomId);
        if(room != null) {
            room.setName(newRoomInfo.getName());
            room.setMode(newRoomInfo.getMode() == 0 ? Mode.FINGER : Mode.FACE);
            room.setDescription(newRoomInfo.getDescription());
            room.setImageUrl(newRoomInfo.getImageUrl());
            room.setMaxPopulation(newRoomInfo.getMaxPopulation());
            room.setPublic(newRoomInfo.isPublic());
            room.setPassword(newRoomInfo.getPassword());
        }

        return room;
    }

    @Transactional
    public Room deleteRoom(Long roomId) {
        Room room = roomRepository.findByRoomId(roomId);

        if(room != null) {
//            User hostUser = room.getHostUser();
//            hostUser.deleteMyRoom(room);

//            List<RoomHashtag> roomHashtags = room.getRoomHashtags();
//            roomHashtags.forEach(new Consumer<RoomHashtag>() {
//                @Override
//                public void accept(RoomHashtag roomHashtag) {
//                    roomHashtag.deleteRoom(room);
//                }
//            });

            roomRepository.delete(room);
        }

        return room;
    }
}

