package com.ssafy.api.service;

import com.ssafy.api.request.UserReq;
import com.ssafy.common.util.UserUtil;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import com.ssafy.db.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service
@Transactional(readOnly = true)
public class UserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserUtil userUtil;
	@Transactional
	public User createUser() throws IOException {
		String newName = userUtil.createName();
		LocalDate date = LocalDate.now();

		User user = new User();
		user.setName(newName);
		user.setRegDate(date);
		user.setCurrentBookPoint(0L);
		user.setCurrentSley(0L);
		user.setWithdrawn(false);
		userRepository.save(user);
		return user;
	}

	public User getUserByUserId(Long userId) {
		return userRepository.findByUserId(userId);
	}

	@Transactional
	public void deleteUser(User user) {
		user.setWithdrawn(true);
	}

	@Transactional
	public void updateUser(User user, UserReq userInfo) {
		user.setName(userInfo.getName());
		user.setDescription(userInfo.getDescription());
		user.setProfileImgUrl(userInfo.getProfileImgUrl());
	}

	public boolean existsByName(String name, Long userId) {
		List<User> userList = userRepository.findByName(name);
		if (userList.size() > 0 && userList.get(0).getId() != userId) {
			return true;
		}
		return false;
	}
}
