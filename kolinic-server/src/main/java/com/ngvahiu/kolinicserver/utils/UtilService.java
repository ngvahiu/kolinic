package com.ngvahiu.kolinicserver.utils;

import com.ngvahiu.kolinicserver.user.User;
import com.ngvahiu.kolinicserver.user.UserResponse;

public class UtilService {
	public static UserResponse filterUserResponse(User user) {
		return new UserResponse(
				user.getId(),
				user.getEmail(),
				user.getFullName(),
				user.getPhoneNumber(),
				user.getGender(),
				user.getDob(),
				user.getAddress(),
				user.getAvatar(),
				user.isActive(),
				user.getRole(),
				user.getPassword() != null && !user.getPassword().isEmpty()
		);
	}
}
