package com.ssafy.api.service;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.db.entity.Mode;
import com.ssafy.db.entity.Room;
import com.ssafy.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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


}

