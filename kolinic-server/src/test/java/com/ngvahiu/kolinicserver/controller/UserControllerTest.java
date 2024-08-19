package com.ngvahiu.kolinicserver.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ngvahiu.kolinicserver.user.*;
import com.ngvahiu.kolinicserver.user.dtos.UpdateMeDTO;
import com.ngvahiu.kolinicserver.utils.APIResponse;
import lombok.extern.slf4j.Slf4j;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@TestPropertySource("classpath:application-test.properties")
@AutoConfigureMockMvc
@Slf4j
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private UserRepository userRepo;

    @Autowired
    ObjectMapper objectMapper;

    private static UpdateMeDTO updateMeDTO;
    private static UserResponse userResponse;
    private static List<User> users;

    @BeforeEach
    public void setup() throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        updateMeDTO = UpdateMeDTO.builder()
                .fullName("Nguyen Van Hieu")
                .phoneNumber("0123456789")
                .address("Da Nang")
                .dob("1999-01-01")
                .build();

        userResponse = UserResponse.builder()
                .id(1L)
                .email("hieu123@gmail.com")
                .fullName("Nguyen Van Hieu")
                .phoneNumber("0712345678")
                .gender(Gender.MALE)
                .dob(formatter.parse("1999-01-01"))
                .address("Da Nang")
                .avatar(null)
                .active(true)
                .role(Role.USER)
                .hasPassword(true)
                .build();

        users = List.of(
                User.builder().id(1L).build(),
                User.builder().id(2L).build(),
                User.builder().id(3L).build()
        );
    }

    // HAPPY CASES
    @Test
    @WithMockUser(username = "user@gmail.com", authorities = { "USER" })
    void getMe_validRequest_success() throws Exception {
        // GIVEN
        when(userRepo.findByEmail(anyString())).thenReturn(Optional.of(
                User.builder()
                    .email("user@gmail.com")
                    .build()
        ));

        // WHEN THEN
        mockMvc.perform(MockMvcRequestBuilders.get("/users/me"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.statusCode").value(200))
                .andExpect(jsonPath("$.data.email").value("user@gmail.com"));
    }

    @Test
    @WithMockUser(username = "hieu123@gmail.com", authorities = { "USER" })
    void updateMe_validRequest_success() throws Exception {
        // GIVEN
        APIResponse<UserResponse> res = APIResponse.<UserResponse>builder().status("success").statusCode(200).data(userResponse).build();
        when(userService.updateMe(anyString(), any(MultipartFile.class), any(UpdateMeDTO.class))).thenReturn(res);

        MockMultipartFile bodyFile = new MockMultipartFile(
                "body",
                null,
                "application/json",
                objectMapper.writeValueAsBytes(updateMeDTO)
        );

        MockMultipartFile avatarFile = new MockMultipartFile(
                "avatar",
                "avatar.png",
                "image/png",
                new byte[0]
        );

        // WHEN THEN
        mockMvc.perform(MockMvcRequestBuilders.multipart("/users/me")
                        .file(bodyFile)
                        .file(avatarFile)
                        .with(request -> {
                            request.setMethod("PATCH"); // Explicitly set the method to PATCH
                            return request;
                        }))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.statusCode").value(200))
                .andExpect(jsonPath("$.data.email").value("hieu123@gmail.com"));
    }

    @Test
    @WithMockUser(username = "admin@gmail.com", authorities = { "ADMIN" })
    void getAllUsers_validRequest_success() throws Exception {
        // GIVEN
        when(userRepo.findAllUsersContaining(anyString())).thenReturn(users);

        // WHEN THEN
        mockMvc.perform(MockMvcRequestBuilders.get("/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.statusCode").value(200))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data", hasSize(3)));
    }

    @Test
    @WithMockUser(username = "admin@gmail.com", authorities = { "ADMIN" })
    void getUser_validRequest_success() throws Exception {
        // GIVEN
        when(userRepo.findById(anyLong())).thenReturn(Optional.of(
                User.builder()
                    .id(1L)
                    .build()
        ));

        // WHEN THEN
        mockMvc.perform(MockMvcRequestBuilders.get("/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.statusCode").value(200))
                .andExpect(jsonPath("$.data.id").value(1));
    }

    @Test
    @WithMockUser(username = "admin@gmail.com", authorities = { "ADMIN" })
    void updateActivationUser_validRequest_success() throws Exception {
        // GIVEN
        when(userRepo.findById(anyLong())).thenReturn(Optional.of(new User()));
        when(userRepo.save(any(User.class))).thenReturn(
                User.builder()
                        .id(1L)
                        .active(true)
                        .build()
        );

        // WHEN THEN
        mockMvc.perform(MockMvcRequestBuilders.patch("/users/activate/1?value=true"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.statusCode").value(200))
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.active").value(true));
    }

    @Test
    @WithMockUser(username = "admin@gmail.com", authorities = { "ADMIN" })
    void deleteUser_validRequest_success() throws Exception {
        // GIVEN
        when(userRepo.findById(anyLong())).thenReturn(Optional.of(new User()));
        doNothing().when(userRepo).deleteById(anyLong());

        // WHEN THEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.statusCode").value(200))
                .andExpect(jsonPath("$.data").value(1));
    }

    // UNHAPPY CASES
    @Test
    void getMe_unauthenticatedRequest_failure() throws Exception {
        // WHEN THEN
        mockMvc.perform(MockMvcRequestBuilders.get("/users/me"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.statusCode").value(401))
                .andExpect(jsonPath("$.status").value("failed"))
                .andExpect(jsonPath("$.errors").isNotEmpty());
    }

    @Test
    @WithMockUser(username = "hieu123@gmail.com", authorities = { "USER" })
    void updateMe_invalidRequest_badRequest() throws Exception {
        updateMeDTO.setPhoneNumber("abc123456");
        updateMeDTO.setDob("01-01-1999");

        // WHEN THEN
        mockMvc.perform(MockMvcRequestBuilders.multipart("/users/me")
                        .file(new MockMultipartFile(
                                "body",
                                null,
                                "application/json",
                                objectMapper.writeValueAsBytes(updateMeDTO)
                        ))
                        .file(new MockMultipartFile(
                                "avatar",
                                "avatar.png",
                                "image/png",
                                new byte[0]
                        ))
                        .with(request -> {
                            request.setMethod("PATCH"); // Explicitly set the method to PATCH
                            return request;
                        }))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.statusCode").value(400))
                .andExpect(jsonPath("$.status").value("failed"))
                .andExpect(jsonPath("$.errors", Matchers.containsInAnyOrder(
                        "Phone number must be in valid form",
                        "Date should be in form yyyy-mm-dd"
                )));
    }

    @Test
    @WithMockUser(username = "hieu123@gmail.com", authorities = { "USER" })
    void getAllUsers_forbiddenRequest_failure() throws Exception {
        // WHEN THEN
        mockMvc.perform(MockMvcRequestBuilders.get("/users"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.statusCode").value(403))
                .andExpect(jsonPath("$.status").value("failed"))
                .andExpect(jsonPath("$.errors").isNotEmpty());
    }

    @Test
    @WithMockUser(username = "hieu123@gmail.com", authorities = { "USER" })
    void getUser_forbiddenRequest_failure() throws Exception {
        // WHEN THEN
        mockMvc.perform(MockMvcRequestBuilders.get("/users/1"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.statusCode").value(403))
                .andExpect(jsonPath("$.status").value("failed"))
                .andExpect(jsonPath("$.errors").isNotEmpty());
    }

    @Test
    @WithMockUser(username = "admin@gmail.com", authorities = { "ADMIN" })
    void getUser_notFoundAccount_failure() throws Exception {
        // WHEN THEN
        mockMvc.perform(MockMvcRequestBuilders.get("/users/1"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.statusCode").value(404))
                .andExpect(jsonPath("$.status").value("failed"))
                .andExpect(jsonPath("$.errors", Matchers.containsInAnyOrder(
                        "No document found with id: 1"
                )));
    }

    @Test
    @WithMockUser(username = "hieu123@gmail.com", authorities = { "USER" })
    void updateActivationUser_forbiddenRequest_failure() throws Exception {
        // WHEN THEN
        mockMvc.perform(MockMvcRequestBuilders.patch("/users/activate/1?value=true"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.statusCode").value(403))
                .andExpect(jsonPath("$.status").value("failed"))
                .andExpect(jsonPath("$.errors").isNotEmpty());
    }

    @Test
    @WithMockUser(username = "admin@gmail.com", authorities = { "ADMIN" })
    void updateActivationUser_notFoundAccount_failure() throws Exception {
        // WHEN THEN
        mockMvc.perform(MockMvcRequestBuilders.patch("/users/activate/1?value=true"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.statusCode").value(404))
                .andExpect(jsonPath("$.status").value("failed"))
                .andExpect(jsonPath("$.errors", Matchers.containsInAnyOrder(
                        "User not found with id: 1"
                )));
    }

    @Test
    @WithMockUser(username = "hieu123@gmail.com", authorities = { "USER" })
    void deleteUser_forbiddenRequest_failure() throws Exception {
        // WHEN THEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/users/activate/1"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.statusCode").value(403))
                .andExpect(jsonPath("$.status").value("failed"))
                .andExpect(jsonPath("$.errors").isNotEmpty());
    }

    @Test
    @WithMockUser(username = "admin@gmail.com", authorities = { "ADMIN" })
    void deleteUser_notFoundAccount_failure() throws Exception {
        // WHEN THEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/users/1"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.statusCode").value(404))
                .andExpect(jsonPath("$.status").value("failed"))
                .andExpect(jsonPath("$.errors", Matchers.containsInAnyOrder(
                        "No document found with id: 1"
                )));
    }
}
