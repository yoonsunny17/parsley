package com.ssafy.api.service;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.api.request.RoomPasswordPostReq;
import com.ssafy.api.request.RoomUpdatePostReq;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.HashtagRepository;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.db.repository.UserRepository;
import com.sun.org.apache.xpath.internal.operations.Mult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    @Autowired
    FileService fileService;

    @Transactional
    public Room createRoom(Long userId, RoomCreatePostReq roomInfo, MultipartFile multipartFile) {
        Room room = new Room();
        room.setName(roomInfo.getName());
        room.setMode(roomInfo.getMode() == 0 ? Mode.FINGER : Mode.FACE);

        String imgUrl = fileService.uploadFile(multipartFile);
        room.setImageUrl(imgUrl);

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

        user.addUserRoom(room);

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
    public Room updateRoom(Long roomId, RoomUpdatePostReq newRoomInfo, MultipartFile multipartFile) {
        Room room = roomRepository.findByRoomId(roomId);

        if(room != null) {
            room.setName(newRoomInfo.getName());
            room.setMode(newRoomInfo.getMode() == 0 ? Mode.FINGER : Mode.FACE);
            room.setDescription(newRoomInfo.getDescription());


            String oldImgUrl = room.getImageUrl();
            String fileName = oldImgUrl.substring(oldImgUrl.lastIndexOf("/") + 1);
            fileService.deleteFile(fileName);


            String newImgUrl = fileService.uploadFile(multipartFile);
            room.setImageUrl(newImgUrl);

            room.setMaxPopulation(newRoomInfo.getMaxPopulation());
            room.setPublic(newRoomInfo.isPublic());
            room.setPassword(newRoomInfo.getPassword());

            List<Hashtag> hashtags = hashtagRepository.findHashtags(room);      //기존 해시태그

            for(RoomHashtag roomHashtag : room.getRoomHashtags()){
                hashtagRepository.delete(roomHashtag);
            }

            List<RoomHashtag> newHashtags = new ArrayList<>();

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

                newHashtags.add(roomHashtag);
            }


            room.setRoomHashtags(newHashtags);
        }
        return room;
    }

    @Transactional
    public boolean deleteRoom(Long userId, Long roomId, RoomPasswordPostReq passwordInfo) {

        User user = userRepository.findByUserId(userId);
        Room room = roomRepository.findByRoomId(roomId);

        if(room != null) {

            User hostUser = room.getHostUser();

            //유저랑 호스트 유저 일치하는지
            if(!user.equals(hostUser)){
                return false;
            }

            //비밀번호 일치여부 확인
            if(!room.isPublic() && !room.getPassword().equals(passwordInfo.getPassword())){
                return false;
            }

            //멤버 삭제
            for(User member : room.getMembers()){
                member.getJoinRooms().remove(room);
            }

            //좋아요 멤버 삭제
            for(User member : room.getLikes()){
                member.getInterestRooms().remove(room);
            }

            //s3의 사진 삭제
            String imgUrl = room.getImageUrl();
            String fileName = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
            fileService.deleteFile(fileName);

            roomRepository.delete(room);
        }
        return true;
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

    public List<Room> searchRooms(String search){

        List<Room> rooms = roomRepository.findRoomsByWord(search);

        return rooms;

    }
}

