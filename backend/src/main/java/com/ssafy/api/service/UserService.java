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
	UserRepository userRepository;

	@Autowired
	AuthRepository authRepository;

	public User getUserByEmail(String email) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
//		User user = userRepository.findUserByEmail(email).get();
//		return user;
		return null;
	}

	public Boolean checkEmail(String email) {
		List findByEmail = authRepository.findbyEmail(email);
		if (findByEmail.size() != 0) {
			return true;
		}
		return false;
//		Boolean existsByEmail = authRepository.existsByEmail(email);
//		return existsByEmail;
	}

	public User getUserByUserId(String userId) {
		return null;
	}

//	public User createUser(String email) {
//		User user = new User();
//		user.setName("익명의사용자");
//		LocalDateTime dateTime = LocalDateTime.now();
//		user.setRegDate(dateTime);
//		user.setCurrentBookPoint(0);
//		user.setCurrentSley(0);
//		user.setIsWithdrawn(false);
//		return userRepository.save(user);
//	}

}
