package com.ngvahiu.kolinicserver.service;

import com.ngvahiu.kolinicserver.auth.AuthResponse;
import com.ngvahiu.kolinicserver.auth.AuthService;
import com.ngvahiu.kolinicserver.auth.dtos.*;
import com.ngvahiu.kolinicserver.config.JwtService;
import com.ngvahiu.kolinicserver.email.EmailService;
import com.ngvahiu.kolinicserver.exception.BadRequestException;
import com.ngvahiu.kolinicserver.exception.ForbiddenException;
import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.user.*;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@TestPropertySource("classpath:application-test.properties")
@Slf4j
public class AuthServiceTest {
    @Autowired
    private AuthService authService;

    @MockBean
    private UserRepository userRepo;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private EmailService emailService;

    private static RegisterDTO registerDto;
    private static AuthenticateDTO authDto;
    private static SocialAuthenticateDTO socialAuthDto;
    private static UpdatePasswordDTO updatePassDto;
    private static AddPasswordDTO addPassDto;
    private static ResetPasswordDTO resetPassDto;
    private static UserResponse userResponse;

    @BeforeAll
    public static void setup() {
        registerDto = RegisterDTO.builder()
                .email("hieu123@gmail.com")
                .fullName("Nguyen Van Hieu")
                .phoneNumber("0712345678")
                .password("Password123")
                .passwordConfirm("Password123")
                .gender("MALE")
                .build();

        authDto = AuthenticateDTO.builder()
                .email("hieu123@gmail.com")
                .password("Password123")
                .build();

        socialAuthDto = SocialAuthenticateDTO.builder()
                .email("hieu123@gmail.com")
                .fullName("Nguyen Van Hieu")
                .avatar("https://avatar.com")
                .build();

        updatePassDto = UpdatePasswordDTO.builder()
                .currentPassword("Password123")
                .newPassword("Password1234")
                .newPasswordConfirm("Password1234")
                .build();

        addPassDto = AddPasswordDTO.builder()
                .password("Password123")
                .passwordConfirm("Password123")
                .build();

        resetPassDto = ResetPasswordDTO.builder()
                .password("Password123")
                .passwordConfirm("Password123")
                .build();

        userResponse = UserResponse.builder()
                .id(1L)
                .email("hieu123@gmail.com")
                .fullName("Nguyen Van Hieu")
                .phoneNumber("0712345678")
                .gender(Gender.MALE)
                .dob(null)
                .address(null)
                .avatar(null)
                .active(true)
                .role(Role.USER)
                .hasPassword(true)
                .build();
    }

    @Nested
    class HappyCase {
        @Test
        void register_validRequest_success() throws Exception {
            // GIVEN
            when(userRepo.findByEmail(anyString())).thenReturn(Optional.empty());
            when(userRepo.save(any())).thenReturn(new User());

            // WHEN
            var response = authService.register(registerDto, null);

            // THEN
            verify(userRepo, times(1)).findByEmail(anyString());
            verify(userRepo, times(1)).save(any());
            verify(passwordEncoder, times(1)).encode(any());
            assertThat(response.getData().getAccessToken()).isNull();
        }

        @Test
        void authenticate_validRequest_success() {
            // GIVEN
            User user = User.builder().active(true).build();
            when(userRepo.findByEmail(anyString())).thenReturn(Optional.of(user));
            when(authenticationManager.authenticate(any())).thenReturn(null);
            when(jwtService.generateToken(any())).thenReturn("accessToken");

            // WHEN
            var response = authService.authenticate(authDto);

            // THEN
            verify(userRepo, times(1)).findByEmail(anyString());
            verify(jwtService, times(1)).generateToken(any());
            assertThat(response.getData().getAccessToken()).isEqualTo("accessToken");
        }

        @Test
        void socialAuthenticate_validRequest_success() {
            // GIVEN
            when(userRepo.findByEmail(anyString())).thenReturn(Optional.empty());
            when(userRepo.save(any())).thenReturn(new User());
            when(jwtService.generateToken(any())).thenReturn("accessToken");

            // WHEN
            var response = authService.socialAuthenticate(socialAuthDto);

            // THEN
            verify(userRepo, times(1)).findByEmail(anyString());
            verify(jwtService, times(1)).generateToken(any());
            assertThat(response.getData().getAccessToken()).isEqualTo("accessToken");
        }

        @Test
        void updatePassword_validRequest_success() {
            // GIVEN
            when(userRepo.findByEmail(anyString())).thenReturn(Optional.of(new User()));
            when(passwordEncoder.matches(any(), any())).thenReturn(true);
            User user = User.builder().email("user@gmail.com").build();
            when(userRepo.save(any())).thenReturn(user);
            when(jwtService.generateToken(any())).thenReturn("accessToken");

            // WHEN
            var response = authService.updatePassword(updatePassDto, "user@gmail.com");

            // THEN
            verify(userRepo, times(1)).findByEmail(anyString());
            verify(jwtService, times(1)).generateToken(any());
            assertThat(response.getData().getAccessToken()).isEqualTo("accessToken");
            assertThat(response.getData().getUser().getEmail()).isEqualTo("user@gmail.com");
        }

        @Test
        void addPassword_validRequest_success() {
            // GIVEN
            User user = User.builder().email("user@gmail.com").build();
            when(userRepo.findByEmail(anyString())).thenReturn(Optional.ofNullable(user));
            when(userRepo.save(any())).thenReturn(user);

            // WHEN
            var response = authService.addPassword(addPassDto, "user@gmail.com");

            // THEN
            verify(userRepo, times(1)).findByEmail(anyString());
            verify(userRepo, times(1)).save(any());
            assertThat(response.getData().getEmail()).isEqualTo("user@gmail.com");
        }

        @Test
        void resetPassword_validRequest_success() {
            // GIVEN
            User user = User.builder()
                    .email("user@gmail.com")
                    .passwordResetExpires(LocalDateTime.MAX)
                    .build();
            when(userRepo.findByPasswordResetToken(anyString())).thenReturn(Optional.of(user));
            when(userRepo.save(any())).thenReturn(user);

            // WHEN
            var response = authService.resetPassword("token", resetPassDto);

            // THEN
            verify(userRepo, times(1)).findByPasswordResetToken(anyString());
            verify(userRepo, times(1)).save(any());
            assertThat(response.getData().getEmail()).isEqualTo("user@gmail.com");
        }

        @Test
        void forgotPassword_validRequest_success() throws Exception {
            // GIVEN
            when(userRepo.findByEmail(anyString())).thenReturn(Optional.of(new User()));
            doNothing().when(emailService).sendEmailResetPassword(anyString(), anyString());

            // WHEN
            var response = authService.forgotPassword("user@gmail.com");

            // THEN
            verify(userRepo, times(1)).findByEmail(anyString());
            verify(userRepo, times(1)).save(any());
            assertThat(response.getData()).isEqualTo("Reset password email sent.");
        }
    }

    @Nested
    class UnhappyCase {
        @Test
        void register_emailAlreadyExists_throwException() {
            // GIVEN
            when(userRepo.findByEmail(anyString())).thenReturn(Optional.of(new User()));

            // WHEN
            var exception = assertThrows(BadRequestException.class, () -> authService.register(registerDto, null));

            // THEN
            verify(userRepo, times(1)).findByEmail(anyString());
            assertThat(exception.getMessage()).isEqualTo("Email already exists.");
        }

        @Test
        void authenticate_userNotActive_throwException() {
            // GIVEN
            User user = User.builder().active(false).build();
            when(userRepo.findByEmail(anyString())).thenReturn(Optional.of(user));

            // WHEN
            var exception = assertThrows(ForbiddenException.class, () -> authService.authenticate(authDto));

            // THEN
            verify(userRepo, times(1)).findByEmail(anyString());
            assertThat(exception.getMessage()).isEqualTo("Your account is inactive");
        }

        @Test
        void authenticate_wrongPassword_throwException() {
            // GIVEN
            when(userRepo.findByEmail(anyString())).thenReturn(Optional.of(new User()));
            when(authenticationManager.authenticate(any())).thenThrow(new BadCredentialsException("Bad credentials"));

            // WHEN
            var exception = assertThrows(BadRequestException.class, () -> authService.authenticate(authDto));

            // THEN
            verify(userRepo, times(1)).findByEmail(anyString());
            assertThat(exception.getMessage()).isEqualTo("Password ís wrong");
        }

        @Test
        void updatePassword_wrongPassword_throwException() {
            // GIVEN
            when(userRepo.findByEmail(anyString())).thenReturn(Optional.of(new User()));
            when(passwordEncoder.matches(any(), any())).thenReturn(false);

            // WHEN
            var exception = assertThrows(BadRequestException.class, () -> authService.updatePassword(updatePassDto, ""));

            // THEN
            verify(userRepo, times(1)).findByEmail(anyString());
            assertThat(exception.getMessage()).isEqualTo("Wrong current password");
        }

        @Test
        void socialAuthenticate_inactiveAccount_throwException() {
            // GIVEN
            when(userRepo.findByEmail(anyString())).thenReturn(Optional.of(User.builder().active(false).build()));

            // WHEN
            var exception = assertThrows(ForbiddenException.class, () -> authService.socialAuthenticate(socialAuthDto));

            // THEN
            verify(userRepo, times(1)).findByEmail(anyString());
            assertThat(exception.getMessage()).isEqualTo("Your account is inactive");
        }

        @Test
        void addPassword_userNotFound_throwException() {
            // GIVEN
            when(userRepo.findByEmail(anyString())).thenReturn(Optional.empty());

            // WHEN
            var exception = assertThrows(NotFoundException.class, () -> authService.addPassword(addPassDto, "user@gmail.com"));

            // THEN
            verify(userRepo, times(1)).findByEmail(anyString());
            assertThat(exception.getMessage()).isEqualTo("User not found with email : user@gmail.com");
        }

        @Test
        void resetPassword_expiredResetToken_throwException() {
            // GIVEN
            User user = User.builder().passwordResetExpires(LocalDateTime.MIN).build();
            when(userRepo.findByPasswordResetToken(anyString())).thenReturn(Optional.of(user));

            // WHEN
            var exception = assertThrows(BadRequestException.class, () -> authService.resetPassword("token", resetPassDto));

            // THEN
            verify(userRepo, times(1)).findByPasswordResetToken(anyString());
            assertThat(exception.getMessage()).isEqualTo("Reset token is expired");
        }

        @Test
        void forgotPassword_userNotFound_throwException() {
            // GIVEN
            when(userRepo.findByEmail(anyString())).thenReturn(Optional.empty());

            // WHEN
            var exception = assertThrows(NotFoundException.class, () -> authService.forgotPassword("user@gmail.com"));

            // THEN
            verify(userRepo, times(1)).findByEmail(anyString());
            assertThat(exception.getMessage()).isEqualTo("User not found with email : user@gmail.com");
        }
    }
}
