package com.ssafy.api.service;

import com.ssafy.api.request.GoalCreatePostReq;
import com.ssafy.api.request.LogCreatePostReq;
import com.ssafy.db.entity.DailyGoal;
import com.ssafy.db.entity.DailyStudyLog;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.DailyGoalRepository;
import com.ssafy.db.repository.DailyStudyRepository;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Service
@Transactional(readOnly = true)
public class StudyService {

    @Autowired
    private DailyGoalRepository dailyGoalRepository;
    @Autowired
    private DailyStudyRepository dailyStudyRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;

    public int getTargetTime(Long userId){
        DailyGoal dailyGoal = dailyGoalRepository.findByUserId(userId);

        if(dailyGoal != null){
            return dailyGoal.getTargetTime();
        }else{
            return 0;
        }
    }

    @Transactional
    public DailyGoal createDailyGoal(GoalCreatePostReq goalInfo, User user){
        DailyGoal dailyGoal = new DailyGoal();

        dailyGoal.setDate(LocalDate.now());
        dailyGoal.setTargetTime(goalInfo.getTargetTime());
        dailyGoal.setUser(user);

        dailyGoalRepository.save(dailyGoal);

        return dailyGoal;
    }

    @Transactional
    public DailyGoal updateDailyGoal(GoalCreatePostReq goalInfo, Long userId){
        DailyGoal dailyGoal = dailyGoalRepository.findByUserId(userId);

        dailyGoal.setTargetTime(goalInfo.getTargetTime());
        dailyGoalRepository.save(dailyGoal);

        return dailyGoal;

    }

    @Transactional
    public DailyStudyLog addDailyGoal(LogCreatePostReq logInfo, Long userId){
        DailyStudyLog dailyStudyLog = new DailyStudyLog();

        User user = userRepository.findByUserId(userId);
        Room room = roomRepository.findByRoomId(logInfo.getRoomId());

        dailyStudyLog.setTime(LocalDateTime.now());
        dailyStudyLog.setStatus(logInfo.isStatus());
        dailyStudyLog.setUser(user);
        dailyStudyLog.setRoom(room);

        dailyStudyRepository.save(dailyStudyLog);

        return dailyStudyLog;
    }
}
