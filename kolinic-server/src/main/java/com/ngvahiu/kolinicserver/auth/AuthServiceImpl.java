package com.ngvahiu.kolinicserver.auth;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ngvahiu.kolinicserver.auth.dtos.AddPasswordDTO;
import com.ngvahiu.kolinicserver.auth.dtos.AuthenticateDTO;
import com.ngvahiu.kolinicserver.auth.dtos.SocialAuthenticateDTO;
import com.ngvahiu.kolinicserver.auth.dtos.RegisterDTO;
import com.ngvahiu.kolinicserver.auth.dtos.ResetPasswordDTO;
import com.ngvahiu.kolinicserver.auth.dtos.UpdatePasswordDTO;
import com.ngvahiu.kolinicserver.config.JwtService;
import com.ngvahiu.kolinicserver.email.EmailService;
import com.ngvahiu.kolinicserver.exception.BadRequestException;
import com.ngvahiu.kolinicserver.exception.ForbiddenException;
import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.user.Gender;
import com.ngvahiu.kolinicserver.user.User;
import com.ngvahiu.kolinicserver.user.UserRepository;
import com.ngvahiu.kolinicserver.user.UserResponse;
import com.ngvahiu.kolinicserver.utils.APIResponse;
import com.ngvahiu.kolinicserver.utils.UtilService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthServiceImpl implements AuthService {
	private final UserRepository userRepo;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	private final EmailService emailService;

	@Override
	@Transactional
	public APIResponse<AuthResponse> register(RegisterDTO registerDto, HttpServletRequest request) throws Exception {
		try {
			// check if password and passwordConfirm are matched.
			if (!registerDto.isPasswordsMatched()) {
				throw new BadRequestException("Passwords are not matched.");
			}
			// check if email is already used.
			Optional<User> checkUser = userRepo.findByEmail(registerDto.getEmail());
			if (!checkUser.isEmpty()) {
				throw new BadRequestException("Email already exists.");
			}

			var user = User.builder().email(registerDto.getEmail()).fullName(registerDto.getFullName())
					.phoneNumber(registerDto.getPhoneNumber())
					.password(passwordEncoder.encode(registerDto.getPassword()))
					.gender(Gender.valueOf(registerDto.getGender())).build();

			var savedUser = userRepo.save(user);

			UserResponse userRes = UtilService.filterUserResponse(savedUser);
			AuthResponse authRes = AuthResponse.builder().user(userRes).accessToken(null).build();

			// send email verification
			emailService.sendEmailVerification(savedUser, request);
			return APIResponse.<AuthResponse>builder().status("success").statusCode(201).data(authRes).build();
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	public APIResponse<AuthResponse> authenticate(AuthenticateDTO authDto) {
		try {
			var user = userRepo.findByEmail(authDto.getEmail()).orElseThrow(() -> {
				throw new BadRequestException("Email is not found");
			});
			try {
				authenticationManager.authenticate(
						new UsernamePasswordAuthenticationToken(authDto.getEmail(), authDto.getPassword()));
			} catch (Exception e) {
				throw new BadRequestException("Password ís wrong");
			}

			if (!user.isActive()) {
				throw new ForbiddenException("Your account is inactive");
			}

			var jwtToken = jwtService.generateToken(user);
			UserResponse userRes = UtilService.filterUserResponse(user);
			AuthResponse authRes = AuthResponse.builder().user(userRes).accessToken(jwtToken).build();

			return APIResponse.<AuthResponse>builder().status("success").statusCode(200).data(authRes).build();
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	@Transactional
	public APIResponse<AuthResponse> updatePassword(UpdatePasswordDTO upPassDto, String email) {
		try {
			if (!upPassDto.isNewPasswordsMatched()) {
				throw new BadRequestException("New passwords are not matched");
			}
			var user = userRepo.findByEmail(email)
					.orElseThrow(() -> new NotFoundException("User not found with email : " + email));
			// check if POSTed current password is correct
			if (!passwordEncoder.matches(upPassDto.getCurrentPassword(), user.getPassword())) {
				throw new BadRequestException("Wrong current password");
			}

			// update password
			String hashedNewPass = passwordEncoder.encode(upPassDto.getNewPassword());
			user.setPassword(hashedNewPass);
			user.setChangePasswordAt(new Date());
			var savedUser = userRepo.save(user);

			// new access token
			var jwtToken = jwtService.generateToken(user);

			UserResponse userRes = UtilService.filterUserResponse(savedUser);
			AuthResponse authRes = AuthResponse.builder().user(userRes).accessToken(jwtToken).build();
			return APIResponse.<AuthResponse>builder().status("success").statusCode(200).data(authRes).build();
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	public APIResponse<String> forgotPassword(String email) throws Exception {
		try {
			var user = userRepo.findByEmail(email)
					.orElseThrow(() -> new NotFoundException("User not found with email : " + email));

			// generate password reset token
			String resetToken = UUID.randomUUID().toString();
			// save password reset token
			user.setPasswordResetToken(resetToken);
			user.setPasswordResetExpires(LocalDateTime.now().plusMinutes(5));
			userRepo.save(user);
			// send reset password link to email
			emailService.sendEmailResetPassword(email, resetToken);

			return APIResponse.<String>builder().status("success").statusCode(201).data("Reset password email sent.")
					.build();
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	@Transactional
	public APIResponse<UserResponse> resetPassword(String token, @Valid ResetPasswordDTO resetPassDto) {
		try {
			if (!resetPassDto.isPasswordsMatched()) {
				throw new BadRequestException("Passwords must be matched");
			}
			var user = userRepo.findByPasswordResetToken(token)
					.orElseThrow(() -> new BadRequestException("Reset token is invalid"));
			if (LocalDateTime.now().isBefore(user.getPasswordResetExpires())) {
				String hashedPass = passwordEncoder.encode(resetPassDto.getPassword());
				user.setPassword(hashedPass);
				user.setPasswordResetToken(null);
				user.setPasswordResetExpires(null);
				User savedUser = userRepo.save(user);

				UserResponse userRes = UtilService.filterUserResponse(savedUser);
				return APIResponse.<UserResponse>builder().status("success").statusCode(200).data(userRes).build();
			} else {
				throw new BadRequestException("Reset token is expired");
			}
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	@Transactional
	public APIResponse<AuthResponse> socialAuthenticate(@Valid SocialAuthenticateDTO authDto) {
		try {
			Optional<User> checkUser = userRepo.findByEmail(authDto.getEmail());
			User user = null;
			if (checkUser.isEmpty()) {
				User newUser = User.builder().fullName(authDto.getFullName()).avatar(authDto.getAvatar())
						.email(authDto.getEmail()).active(true).build();
				user = userRepo.save(newUser);
			} else {
				if (!checkUser.get().isActive()) {
					throw new ForbiddenException("Your account is inactive");
				}
				user = checkUser.get();
			}

			var jwtToken = jwtService.generateToken(user);
			UserResponse userRes = UtilService.filterUserResponse(user);
			AuthResponse authRes = AuthResponse.builder().user(userRes).accessToken(jwtToken).build();

			return APIResponse.<AuthResponse>builder().status("success").statusCode(200).data(authRes).build();
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	@Transactional
	public APIResponse<UserResponse> addPassword(AddPasswordDTO addPassDto, String email) {
		try {
			if (!addPassDto.isPasswordsMatched()) {
				throw new BadRequestException("Passwords are not matched");
			}
			var user = userRepo.findByEmail(email)
					.orElseThrow(() -> new NotFoundException("User not found with email : " + email));

			// update password
			String hashedPass = passwordEncoder.encode(addPassDto.getPassword());
			user.setPassword(hashedPass);
			var savedUser = userRepo.save(user);
			
			UserResponse userRes = UtilService.filterUserResponse(savedUser);
			return APIResponse.<UserResponse>builder().status("success").statusCode(200).data(userRes).build();
		} catch (Exception e) {
			throw e;
		}
	}
}
