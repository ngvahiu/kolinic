package com.ngvahiu.kolinicserver.user;

import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.user.dtos.UpdateMeDTO;
import com.ngvahiu.kolinicserver.utils.APIResponse;

public interface UserService {
	APIResponse<?> updateMe(String email, MultipartFile avatar, UpdateMeDTO updateMeDto) throws Exception;
}
