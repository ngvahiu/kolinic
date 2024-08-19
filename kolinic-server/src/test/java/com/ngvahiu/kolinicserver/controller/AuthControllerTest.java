package com.ngvahiu.kolinicserver.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ngvahiu.kolinicserver.auth.AuthResponse;
import com.ngvahiu.kolinicserver.auth.AuthService;
import com.ngvahiu.kolinicserver.auth.dtos.*;
import com.ngvahiu.kolinicserver.user.Gender;
import com.ngvahiu.kolinicserver.user.Role;
import com.ngvahiu.kolinicserver.user.UserResponse;
import com.ngvahiu.kolinicserver.utils.APIResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@TestPropertySource("classpath:application-test.properties")
@AutoConfigureMockMvc
@Slf4j
public class AuthControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @Autowired
    ObjectMapper objectMapper;

    private static RegisterDTO registerDto;
    private static AuthenticateDTO authDto;
    private static SocialAuthenticateDTO socialAuthDto;
    private static UpdatePasswordDTO updatePassDto;
    private static AddPasswordDTO addPassDto;
    private static ResetPasswordDTO resetPassDto;
    private static UserResponse userResponse;
    private static AuthResponse registerResponse;
    private static AuthResponse response;

    @BeforeEach
    public void setup() {
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

        registerResponse = AuthResponse.builder()
                .user(userResponse)
                .accessToken(null)
                .build();

        response = AuthResponse.builder()
                .user(userResponse)
                .accessToken("accessToken")
                .build();
    }

    @Nested
    class HappyCase {
        @Test
        void register_validRequest_success() throws Exception {
            APIResponse<AuthResponse> res = APIResponse.<AuthResponse>builder().status("success").statusCode(201).data(registerResponse).build();
            when(authService.register(any(RegisterDTO.class), any(HttpServletRequest.class)))
                    .thenReturn(res);

            // WHEN THEN
            mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(registerDto)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("status").value("success"))
                    .andExpect(jsonPath("statusCode").value(201))
                    .andExpect(jsonPath("data.accessToken").doesNotExist())
                    .andExpect(jsonPath("data.user.id").value(userResponse.getId()))
                    .andExpect(jsonPath("data.user.email").value(userResponse.getEmail()));
        }

        @Test
        void authenticate_validRequest_success() throws Exception {
            APIResponse<AuthResponse> res = APIResponse.<AuthResponse>builder().status("success").statusCode(200).data(response).build();
            when(authService.authenticate(any(AuthenticateDTO.class)))
                    .thenReturn(res);

            // WHEN THEN
            mockMvc.perform(MockMvcRequestBuilders.post("/auth/authenticate")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(authDto)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("status").value("success"))
                    .andExpect(jsonPath("statusCode").value(200))
                    .andExpect(jsonPath("data.accessToken").value(response.getAccessToken()))
                    .andExpect(jsonPath("data.user.id").value(userResponse.getId()))
                    .andExpect(jsonPath("data.user.email").value(userResponse.getEmail()));
        }

        @Test
        void socialAuthenticate_validRequest_success() throws Exception {
            APIResponse<AuthResponse> res = APIResponse.<AuthResponse>builder().status("success").statusCode(200).data(response).build();
            when(authService.socialAuthenticate(any(SocialAuthenticateDTO.class)))
                    .thenReturn(res);

            // WHEN THEN
            mockMvc.perform(MockMvcRequestBuilders.post("/auth/social/authenticate")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(socialAuthDto)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("status").value("success"))
                    .andExpect(jsonPath("statusCode").value(200))
                    .andExpect(jsonPath("data.accessToken").value(response.getAccessToken()))
                    .andExpect(jsonPath("data.user.id").value(userResponse.getId()))
                    .andExpect(jsonPath("data.user.email").value(userResponse.getEmail()));
        }

        @Test
        @WithMockUser(username = "user@gmail.com")
        void updatePassword_validRequest_success() throws Exception {
            APIResponse<AuthResponse> res = APIResponse.<AuthResponse>builder().status("success").statusCode(200).data(response).build();
            when(authService.updatePassword(any(UpdatePasswordDTO.class), anyString()))
                    .thenReturn(res);

            // WHEN THEN
            mockMvc.perform(MockMvcRequestBuilders.patch("/auth/update-password")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(updatePassDto)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("status").value("success"))
                    .andExpect(jsonPath("statusCode").value(200))
                    .andExpect(jsonPath("data.accessToken").value(response.getAccessToken()))
                    .andExpect(jsonPath("data.user.id").value(userResponse.getId()))
                    .andExpect(jsonPath("data.user.email").value(userResponse.getEmail()));
        }

        @Test
        @WithMockUser(username = "user@gmail.com")
        void addPassword_validRequest_success() throws Exception {
            APIResponse<UserResponse> res = APIResponse.<UserResponse>builder().status("success").statusCode(200).data(userResponse).build();
            when(authService.addPassword(any(AddPasswordDTO.class), anyString()))
                    .thenReturn(res);

            // WHEN THEN
            mockMvc.perform(MockMvcRequestBuilders.patch("/auth/add-password")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(addPassDto)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("status").value("success"))
                    .andExpect(jsonPath("statusCode").value(200))
                    .andExpect(jsonPath("data.id").value(userResponse.getId()))
                    .andExpect(jsonPath("data.email").value(userResponse.getEmail()));
        }

        @Test
        void forgotPassword_validRequest_success() throws Exception {
            APIResponse<String> res = APIResponse.<String>builder().status("success").statusCode(201).data("Reset password email sent.").build();
            when(authService.forgotPassword(anyString()))
                    .thenReturn(res);

            // WHEN THEN
            mockMvc.perform(MockMvcRequestBuilders.post("/auth/forgot-password")
                            .param("email", "hieu123@gmail.com"))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("status").value("success"))
                    .andExpect(jsonPath("statusCode").value(201))
                    .andExpect(jsonPath("data").value("Reset password email sent."));
        }

        @Test
        void resetPassword_validRequest_success() throws Exception {
            APIResponse<UserResponse> res = APIResponse.<UserResponse>builder().status("success").statusCode(200).data(userResponse).build();
            when(authService.resetPassword(anyString(), any(ResetPasswordDTO.class)))
                    .thenReturn(res);

            // WHEN THEN
            mockMvc.perform(MockMvcRequestBuilders.patch("/auth/reset-password/abc123")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(resetPassDto)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("status").value("success"))
                    .andExpect(jsonPath("statusCode").value(200))
                    .andExpect(jsonPath("data.id").value(userResponse.getId()))
                    .andExpect(jsonPath("data.email").value(userResponse.getEmail()));
        }

        @Test
        @WithMockUser(username = "user@gmail.com")
        void logout_validRequest_success() throws Exception {
            // WHEN THEN
            mockMvc.perform(MockMvcRequestBuilders.post("/auth/logout")
                            .header("Authorization", "Bearer " + "abc123"))
                    .andExpect(status().isOk());
        }
    }

    @Nested
    class UnhappyCase {
        @Test
        void register_invalidRequest_badRequest() throws Exception {
            // GIVEN
            registerDto.setEmail("hieu123gmail.com");
            registerDto.setFullName("");

            // WHEN THEN
            mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(registerDto)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("status").value("failed"))
                    .andExpect(jsonPath("statusCode").value(400))
                    .andExpect(jsonPath("errors", Matchers.containsInAnyOrder(
                            "Email must be in valid form",
                            "Name should not be NULL or empty"
                    )));
        }

        @Test
        void authenticate_invalidRequest_badRequest() throws Exception {
            // GIVEN
            authDto.setEmail("hieu123gmail.com");

            // WHEN THEN
            mockMvc.perform(MockMvcRequestBuilders.post("/auth/authenticate")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(authDto)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("status").value("failed"))
                    .andExpect(jsonPath("statusCode").value(400))
                    .andExpect(jsonPath("errors[0]").value("Email must be in valid form"));
        }

        @Test
        void socialAuthenticate_invalidRequest_badRequest() throws Exception {
            // GIVEN
            registerDto.setEmail("hieu123gmail.com");
            registerDto.setFullName("");

            // WHEN THEN
            mockMvc.perform(MockMvcRequestBuilders.post("/auth/social/authenticate")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(registerDto)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("status").value("failed"))
                    .andExpect(jsonPath("statusCode").value(400))
                    .andExpect(jsonPath("errors", Matchers.containsInAnyOrder(
                            "Email must be in valid form",
                            "Name should not be NULL or empty"
                    )));
        }

        @Test
        @WithMockUser(username = "user@gmail.com")
        void updatePassword_invalidRequest_badRequest() throws Exception {
            // GIVEN
            updatePassDto.setNewPassword("abc");

            // WHEN THEN
            mockMvc.perform(MockMvcRequestBuilders.patch("/auth/update-password")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(updatePassDto)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("status").value("failed"))
                    .andExpect(jsonPath("statusCode").value(400))
                    .andExpect(jsonPath("errors", Matchers.containsInAnyOrder(
                            "New password must have at least 8 characters",
                            "Password must contain at least 1 uppercase, 1 lowercase, and 1 digit"
                    )));
        }

        @Test
        @WithMockUser(username = "user@gmail.com")
        void addPassword_invalidRequest_badRequest() throws Exception {
            // GIVEN
            addPassDto.setPassword("abc");
            addPassDto.setPasswordConfirm("");

            // WHEN THEN
            mockMvc.perform(MockMvcRequestBuilders.patch("/auth/add-password")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(addPassDto)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("status").value("failed"))
                    .andExpect(jsonPath("statusCode").value(400))
                    .andExpect(jsonPath("errors", Matchers.containsInAnyOrder(
                            "Password must have at least 8 characters",
                            "Password must contain at least 1 uppercase, 1 lowercase, and 1 digit",
                            "Password confirm should not be NULL or empty"
                    )));
        }

        @Test
        void resetPassword_invalidRequest_badRequest() throws Exception {
            // GIVEN
            resetPassDto.setPassword("abc");
            resetPassDto.setPasswordConfirm("");

            // WHEN THEN
            mockMvc.perform(MockMvcRequestBuilders.patch("/auth/reset-password/abc123")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(resetPassDto)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("status").value("failed"))
                    .andExpect(jsonPath("statusCode").value(400))
                    .andExpect(jsonPath("errors", Matchers.containsInAnyOrder(
                            "Password must have at least 8 characters",
                            "Password confirm should not be NULL or empty",
                            "Password must contain at least 1 uppercase, 1 lowercase, and 1 digit"
                    )));
        }
    }
}
