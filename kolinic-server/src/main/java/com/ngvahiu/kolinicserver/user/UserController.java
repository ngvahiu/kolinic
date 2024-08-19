package com.ngvahiu.kolinicserver.user;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.handler.CrudHandlerFactory;
import com.ngvahiu.kolinicserver.user.dtos.UpdateMeDTO;
import com.ngvahiu.kolinicserver.utils.APIResponse;
import com.ngvahiu.kolinicserver.utils.UtilService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {
	private final UserRepository userRepo;
	private final UserService userService;
	private final CrudHandlerFactory<User> crudService;

	// ME
	@GetMapping("me")
	public ResponseEntity<APIResponse<?>> getMe() {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userRepo.findByEmail(email).orElse(null);

		UserResponse userRes = UtilService.filterUserResponse(user);
		APIResponse<UserResponse> res = APIResponse.<UserResponse>builder().status("success").statusCode(200)
				.data(userRes).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PatchMapping(value = "me", consumes = { "multipart/form-data" })
	public ResponseEntity<?> updateMe(@Valid @RequestPart(required = false, value = "body") UpdateMeDTO updateMeDto,
			@RequestPart(required = false, value = "avatar") MultipartFile avatar) throws Exception {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		APIResponse<UserResponse> res = userService.updateMe(email, avatar, updateMeDto);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	// ADMIN
	@GetMapping
	public ResponseEntity<APIResponse<?>> getAllUsers(@RequestParam(defaultValue = "") String search) {
		List<User> users = userRepo.findAllUsersContaining(search);
		List<UserResponse> usersRes = users.stream().map((user) -> UtilService.filterUserResponse(user)).collect(Collectors.toList());
		
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200)
				.data(usersRes).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<APIResponse<?>> getUser(@PathVariable("id") long id) {
		User user = this.crudService.getOne(userRepo, id);
		
		UserResponse userRes = UtilService.filterUserResponse(user);
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200)
				.data(userRes).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@PatchMapping("activate/{id}")
	public ResponseEntity<APIResponse<?>> updateActivationUser(@PathVariable("id") long id, @RequestParam("value") boolean value) {
		User user = userRepo.findById(id).orElseThrow(() -> new NotFoundException("User not found with id: " + id));
		user.setActive(value);
		User savedUser = userRepo.save(user);
		
		UserResponse userRes = UtilService.filterUserResponse(savedUser);
		APIResponse<UserResponse> res = APIResponse.<UserResponse>builder().status("success").statusCode(200)
				.data(userRes).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteUser(@PathVariable("id") long id) {
		this.crudService.deleteOne(userRepo, id);
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(id).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
}
