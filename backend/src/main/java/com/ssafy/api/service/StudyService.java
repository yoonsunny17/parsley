package com.ssafy.api.service;

import com.ssafy.api.request.GoalCreatePostReq;
import com.ssafy.db.entity.DailyGoal;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.DailyGoalRepository;
import com.ssafy.db.repository.DailyStudyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;


@Service
@Transactional(readOnly = true)
public class StudyService {

    @Autowired
    private DailyGoalRepository dailyGoalRepository;

    @Autowired
    private DailyStudyRepository dailyStudyRepository;

    @Transactional
    public DailyGoal createDailyGoal(GoalCreatePostReq goalInfo, User user){
        DailyGoal dailyGoal = new DailyGoal();

        dailyGoal.setDate(LocalDate.now());
        dailyGoal.setTargetTime(goalInfo.getTargetTime());
        dailyGoal.setUser(user);

        dailyGoalRepository.save(dailyGoal);

        return dailyGoal;
    }
}
