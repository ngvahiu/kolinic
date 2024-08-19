package com.ngvahiu.kolinicserver.auth;

import com.ngvahiu.kolinicserver.auth.dtos.AddPasswordDTO;
import com.ngvahiu.kolinicserver.auth.dtos.AuthenticateDTO;
import com.ngvahiu.kolinicserver.auth.dtos.SocialAuthenticateDTO;
import com.ngvahiu.kolinicserver.auth.dtos.RegisterDTO;
import com.ngvahiu.kolinicserver.auth.dtos.ResetPasswordDTO;
import com.ngvahiu.kolinicserver.auth.dtos.UpdatePasswordDTO;
import com.ngvahiu.kolinicserver.user.UserResponse;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

public interface AuthService {
	APIResponse<AuthResponse> register(RegisterDTO registerDto, HttpServletRequest request) throws Exception;
	APIResponse<AuthResponse> authenticate(AuthenticateDTO authDto);
	APIResponse<AuthResponse> updatePassword(UpdatePasswordDTO upPassDto, String email);
	APIResponse<String> forgotPassword(String email) throws Exception;
	APIResponse<UserResponse> resetPassword(String token, @Valid ResetPasswordDTO resetPassDto);
	APIResponse<AuthResponse> socialAuthenticate(@Valid SocialAuthenticateDTO authDto);
	APIResponse<UserResponse> addPassword(AddPasswordDTO addPassDto, String email);
}
