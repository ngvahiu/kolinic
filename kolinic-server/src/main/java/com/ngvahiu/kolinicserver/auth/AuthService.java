package com.ngvahiu.kolinicserver.auth;

import com.ngvahiu.kolinicserver.auth.dtos.AddPasswordDTO;
import com.ngvahiu.kolinicserver.auth.dtos.AuthenticateDTO;
import com.ngvahiu.kolinicserver.auth.dtos.SocialAuthenticateDTO;
import com.ngvahiu.kolinicserver.auth.dtos.RegisterDTO;
import com.ngvahiu.kolinicserver.auth.dtos.ResetPasswordDTO;
import com.ngvahiu.kolinicserver.auth.dtos.UpdatePasswordDTO;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

public interface AuthService {
	APIResponse<?> register(RegisterDTO registerDto, HttpServletRequest request) throws Exception;
	APIResponse<?> authenticate(AuthenticateDTO authDto);
	APIResponse<?> updatePassword(UpdatePasswordDTO upPassDto, String email);
	APIResponse<?> forgotPassword(String email) throws Exception;
	APIResponse<?> resetPassword(String token, @Valid ResetPasswordDTO resetPassDto);
	APIResponse<?> socialAuthenticate(@Valid SocialAuthenticateDTO authDto);
	APIResponse<?> addPassword(AddPasswordDTO addPassDto, String email);
}
