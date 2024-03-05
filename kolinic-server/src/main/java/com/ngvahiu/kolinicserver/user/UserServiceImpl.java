package com.ngvahiu.kolinicserver.user;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.storage.StorageService;
import com.ngvahiu.kolinicserver.user.dtos.UpdateMeDTO;
import com.ngvahiu.kolinicserver.utils.APIResponse;
import com.ngvahiu.kolinicserver.utils.UtilService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	private final UserRepository userRepo;
	private final StorageService storageService;

	@Override
	public APIResponse<?> updateMe(String email, MultipartFile avatar, UpdateMeDTO updateMeDto) throws Exception {
		try {
			var user = userRepo.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found with email : " + email));
			
			if(updateMeDto.getFullName() != null) user.setFullName(updateMeDto.getFullName());
			if(updateMeDto.getPhoneNumber() != null) user.setPhoneNumber(updateMeDto.getPhoneNumber());
			if(updateMeDto.getAddress() != null) user.setAddress(updateMeDto.getAddress());
			if(updateMeDto.getGender() != null) user.setGender(Gender.valueOf(updateMeDto.getGender()));
			if(updateMeDto.getDob() != null) {
				SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
				user.setDob(formatter.parse(updateMeDto.getDob()));
			}
			if(avatar != null) {
				if(user.getAvatar() != null || user.getAvatar() != "") {
					storageService.deleteFile(user.getAvatar());
				}
				String url = storageService.uploadFile(avatar, "user");
				user.setAvatar(url);
			}
			var savedUser = userRepo.save(user);
			UserResponse userRes = UtilService.filterUserResponse(savedUser);
			return APIResponse.<UserResponse>builder().status("success").statusCode(200).data(userRes).build();
		} catch (Exception e) {
			throw e;
		}
	}

}
