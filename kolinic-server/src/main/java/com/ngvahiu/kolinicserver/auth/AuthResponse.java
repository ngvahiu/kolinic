package com.ngvahiu.kolinicserver.auth;

import com.ngvahiu.kolinicserver.user.UserResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
	private UserResponse user;
	private String accessToken;
}
