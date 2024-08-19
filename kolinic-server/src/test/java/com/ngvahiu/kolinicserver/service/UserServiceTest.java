package com.ngvahiu.kolinicserver.service;

import com.ngvahiu.kolinicserver.storage.StorageService;
import com.ngvahiu.kolinicserver.user.User;
import com.ngvahiu.kolinicserver.user.UserRepository;
import com.ngvahiu.kolinicserver.user.UserService;
import com.ngvahiu.kolinicserver.user.dtos.UpdateMeDTO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;

@SpringBootTest
@TestPropertySource("classpath:application-test.properties")
@AutoConfigureMockMvc
@Slf4j
public class UserServiceTest {
    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepo;

    @MockBean
    private StorageService storageService;

    private static UpdateMeDTO updateMeDTO;
    private static MultipartFile avatar;

    @BeforeEach
    void setUp() {
        updateMeDTO = UpdateMeDTO.builder()
                .fullName("Nguyen Van Hieu")
                .phoneNumber("0123456789")
                .address("Da Nang")
                .dob("1999-01-01")
                .build();
        avatar = new MockMultipartFile(
                "file",
                "test.png",
                "text/png",
                "This is the content of the file".getBytes()
        );
    }

    @Test
    void updateMe_notIncludeAvatar_success() throws Exception {
        // GIVEN
        when(userRepo.findByEmail(anyString())).thenReturn(Optional.of(new User()));
        when(userRepo.save(any(User.class))).thenReturn(User.builder().email("user@gmail.com").build());

        // WHEN
        var response = userService.updateMe("user@gmail.com", null, updateMeDTO);

        // THEN
        verify(userRepo, times(1)).findByEmail(anyString());
        verify(userRepo, times(1)).save(any(User.class));
        assertThat(response.getData().getEmail()).isEqualTo("user@gmail.com");
    }

    @Test
    void updateMe_includeAvatar_success() throws Exception {
        // GIVEN
        when(userRepo.findByEmail(anyString())).thenReturn(Optional.of(User.builder().avatar("https://avatar.com").build()));
        when(userRepo.save(any(User.class))).thenReturn(User.builder().email("user@gmail.com").build());
        when(storageService.deleteFile(anyString())).thenReturn("");
        when(storageService.uploadFile(any(MultipartFile.class), anyString())).thenReturn("https://new-avatar.com");

        // WHEN
        var response = userService.updateMe("user@gmail.com", avatar, updateMeDTO);

        // THEN
        verify(userRepo, times(1)).findByEmail(anyString());
        verify(userRepo, times(1)).save(any(User.class));
        assertThat(response.getData().getEmail()).isEqualTo("user@gmail.com");
    }
}
