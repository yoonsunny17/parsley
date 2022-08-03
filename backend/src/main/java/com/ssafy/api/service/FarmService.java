package com.ssafy.api.service;

import com.ssafy.api.request.HerbAddPostReq;
import com.ssafy.api.request.UserHerbBookAddPostReq;
import com.ssafy.db.entity.Herb;
import com.ssafy.db.entity.HerbBook;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserHerbBook;
import com.ssafy.db.repository.HerbBookRepository;
import com.ssafy.db.repository.UserHerbBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;

/**
 *	농장게임 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */

@Service
@Transactional(readOnly = true)
public class FarmService {

    @Autowired
    private UserHerbBookRepository userHerbBookRepository;

    @Autowired
    private HerbBookRepository herbBookRepository;

    public List<UserHerbBook> getUserHerbBooks(User user){
        List<UserHerbBook> userHerbBooks = userHerbBookRepository.findByUser(user);
        return userHerbBooks;
    }

    @Transactional
    public UserHerbBook addUserHerbBook(User user, UserHerbBookAddPostReq herbBookInfo){
        UserHerbBook userHerbBook = new UserHerbBook();
        HerbBook herbBook = herbBookRepository.findByHerbBookId(herbBookInfo.getHerbBookId());
        System.out.println(herbBook.getName());
        LocalDateTime date = LocalDateTime.now();
        userHerbBook.setObtainedDate(date);
        userHerbBook.setUser(user);
        userHerbBook.setHerbBook(herbBook);

        userHerbBookRepository.save(userHerbBook);
        return userHerbBook;
    }


}
