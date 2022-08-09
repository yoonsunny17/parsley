package com.ssafy.api.service;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.api.request.RoomPasswordPostReq;
import com.ssafy.api.request.RoomUpdatePostReq;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.HashtagRepository;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.function.Consumer;

@Service
@Transactional(readOnly = true)
public class RoomService {
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    HashtagRepository hashtagRepository;

    @Transactional
    public Room createRoom(Long userId, RoomCreatePostReq roomInfo) {
        Room room = new Room();
        room.setName(roomInfo.getName());
        room.setMode(roomInfo.getMode() == 0 ? Mode.FINGER : Mode.FACE);
        room.setImageUrl(roomInfo.getImageUrl());
        room.setDescription(roomInfo.getDescription());
        room.setMaxPopulation(roomInfo.getMaxPopulation());
        room.setPublic(roomInfo.isPublic());
        room.setPassword(roomInfo.getPassword());

        User user = userRepository.findByUserId(userId);
        room.setHostUser(user);

        roomRepository.save(room);

        for(String tag : roomInfo.getHashtags()){
            Hashtag hashtag = hashtagRepository.findBytag(tag);

            if(hashtag == null){        //이전에 사용한 적 없는 태그
                hashtag = new Hashtag();
                hashtag.setTag(tag);
                hashtag.setUseCount(1L);
                hashtagRepository.saveHashtag(hashtag);
            }else{
                hashtag.setUseCount(hashtag.getUseCount()+1L);
            }
            RoomHashtag roomHashtag = new RoomHashtag();
            roomHashtag.setRoom(room);
            roomHashtag.setHashtag(hashtag);
            hashtagRepository.saveRoomHashtag(roomHashtag);
        }

        return room;
    }

    public List<Room> getRooms() {
        return roomRepository.findRooms();
    }

    public Room getRoomByRoomId(Long roomId) {
        return roomRepository.findByRoomId(roomId);
    }

    public boolean isHostUser(Long userId, Long roomId){
        Room room = roomRepository.findByRoomId(roomId);
        User user = userRepository.findByUserId(userId);

        if(room.getHostUser().equals(user)){
            return true;
        }else{
            return false;
        }
    }

    public boolean isCorrectPwd(RoomPasswordPostReq passwordInfo){
        Room room = roomRepository.findByRoomId(passwordInfo.getRoomId());

        if(room.getPassword().equals(passwordInfo.getPassword())){
            return true;
        }else{
            return false;
        }
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

            List<RoomHashtag> hashtags = room.getRoomHashtags();

            for(RoomHashtag hashtag : room.getRoomHashtags()){
                hashtagRepository.delete(hashtag);
            }

            for(String tag : newRoomInfo.getHashtags()){
                Hashtag hashtag = hashtagRepository.findBytag(tag);

                if(hashtag == null){        //이전에 사용한 적 없는 태그
                    hashtag = new Hashtag();
                    hashtag.setTag(tag);
                    hashtag.setUseCount(1L);
                    hashtagRepository.saveHashtag(hashtag);
                }else if(!hashtags.contains(hashtag)) {   //해당 방에서 사용한 적이 없을 때
                    hashtag.setUseCount(hashtag.getUseCount() + 1L);
                }
                RoomHashtag roomHashtag = new RoomHashtag();
                roomHashtag.setRoom(room);
                roomHashtag.setHashtag(hashtag);
                hashtagRepository.saveRoomHashtag(roomHashtag);
            }
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

    public List<String> getHashtags(){

        Iterator<Hashtag> hashtags = hashtagRepository.findAll().iterator();

        List<String> topHashtags = new ArrayList<>();
        int cnt = 0;
        while(hashtags.hasNext() && cnt < 5){
            topHashtags.add(hashtags.next().getTag());
            cnt++;
        }

        return topHashtags;
    }
}

