package com.ssafy.api.service;

import com.ssafy.db.repository.AuthRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import com.ssafy.db.entity.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public User createUser() {
		User user = new User();
		user.setName("익명의사용자"); // 유저 이름 생성 로직 나중에 구현
		LocalDateTime dateTime = LocalDateTime.now();
		user.setRegDate(dateTime);
//		user.setCurrentBookPoint(0L);
		user.setCurrentSley(0L);
		user.setWithdrawn(false);
		userRepository.save(user);
		return user;
	}

}
