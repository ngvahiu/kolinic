package com.ngvahiu.kolinicserver.auth;

import com.ngvahiu.kolinicserver.user.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ngvahiu.kolinicserver.auth.dtos.AddPasswordDTO;
import com.ngvahiu.kolinicserver.auth.dtos.AuthenticateDTO;
import com.ngvahiu.kolinicserver.auth.dtos.SocialAuthenticateDTO;
import com.ngvahiu.kolinicserver.auth.dtos.RegisterDTO;
import com.ngvahiu.kolinicserver.auth.dtos.ResetPasswordDTO;
import com.ngvahiu.kolinicserver.auth.dtos.UpdatePasswordDTO;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthController {
	private final AuthService authService;

	@PostMapping("register")
	public ResponseEntity<APIResponse<?>> register(@Valid @RequestBody RegisterDTO registerDto, HttpServletRequest request) throws Exception {
		APIResponse<AuthResponse> res = authService.register(registerDto, request);
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}

	@PostMapping("authenticate")
	public ResponseEntity<APIResponse<?>> authenticate(@Valid @RequestBody AuthenticateDTO authDto) {
		APIResponse<AuthResponse> res = authService.authenticate(authDto);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@PostMapping("social/authenticate")
	public ResponseEntity<APIResponse<?>> socialAuthenticate(@Valid @RequestBody SocialAuthenticateDTO authDto) {
		APIResponse<AuthResponse> res = authService.socialAuthenticate(authDto);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PatchMapping("update-password")
	public ResponseEntity<APIResponse<?>> updatePassword(@Valid @RequestBody UpdatePasswordDTO upPassDto) {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		APIResponse<AuthResponse> res = authService.updatePassword(upPassDto, email);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@PatchMapping("add-password")
	public ResponseEntity<APIResponse<?>> addPassword(@Valid @RequestBody AddPasswordDTO addPassDto) {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		APIResponse<UserResponse> res = authService.addPassword(addPassDto, email);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PostMapping("forgot-password")
	public ResponseEntity<APIResponse<?>> forgotPassword(@RequestParam(name = "email") String email) throws Exception {
		APIResponse<String> res = authService.forgotPassword(email);
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}
	
	@PatchMapping("reset-password/{token}")
	public ResponseEntity<APIResponse<?>> resetPassword(
		@PathVariable(name = "token") String token,
		@Valid @RequestBody ResetPasswordDTO resetPassDto
	) {
		APIResponse<UserResponse> res = authService.resetPassword(token, resetPassDto);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
}
