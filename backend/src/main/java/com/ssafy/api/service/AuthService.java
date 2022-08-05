package com.ssafy.api.service;

import com.ssafy.db.entity.Auth;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private UserService userService;

    // auth table에 email에 해당하는 user가 있는지 확인
    public Boolean checkEmail(String email) {
        List<Auth> findByEmail = authRepository.findByEmail(email);
        if (findByEmail.size() != 0) {
            return true;
        }
        return false;
    }

    // email에 해당하는 유저 반환
    public User getUserByEmail(String email) {
        Auth auth = authRepository.findByEmail(email).get(0);
        return auth.getUser();
    }

    @Transactional
    public void createAuth(User user, String email) {
        Auth auth = new Auth();
        auth.setEmail(email);
        String uuid = "parsley" + email; // uuid 생성 로직 나중에 구현
        auth.setUuid(uuid);
        auth.setUser(user);
        authRepository.save(auth);
    }

    public String getEmailbyUserId(Long userId) {
        User user = userService.getUser(userId);
        Auth auth = authRepository.findByUser(user);
        return auth.getEmail();
    }
}
