package com.ssafy.api.service;

import com.ssafy.api.request.UserUpdateReq;
import com.ssafy.common.util.UserUtil;
import com.ssafy.db.entity.HerbBook;
import com.ssafy.db.repository.HerbBookRepository;
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
	private HerbBookRepository herbBookRepository;

	@Autowired
	private UserUtil userUtil;
	@Transactional
	public User createUser() throws IOException {
		String newName = userUtil.createName();
		LocalDate date = LocalDate.now();

		User user = new User();
		user.setName(newName);
		user.setRegDate(date);
		user.setDescription("안녕하세요. 파슬리입니다. :)");
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
	public void updateUser(User user, UserUpdateReq userInfo) {
		HerbBook herbBook = herbBookRepository.findByHerbBookId(userInfo.getHerbBookId());
		user.setName(userInfo.getName());
		user.setDescription(userInfo.getDescription());
		user.setProfileHerb(herbBook);
	}

	public boolean existsByName(String name, Long userId) {
		List<User> userList = userRepository.findByName(name);
		if (userList.size() > 0 && userList.get(0).getId() != userId) {
			return true;
		}
		return false;
	}

	@Transactional
	public void rejoinUser(User user) {
		user.setWithdrawn(false);
	}
}
