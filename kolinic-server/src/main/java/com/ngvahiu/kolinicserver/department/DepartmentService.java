package com.ngvahiu.kolinicserver.department;

import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.department.dtos.CreateDepartmentDTO;
import com.ngvahiu.kolinicserver.department.dtos.UpdateDepartmentDTO;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;

public interface DepartmentService {
	APIResponse<?> createDepartment(MultipartFile logo, MultipartFile img,
			@Valid CreateDepartmentDTO createDepartmentDto);
	APIResponse<?> updateDepartment(long id, MultipartFile logo, MultipartFile img,
			@Valid UpdateDepartmentDTO updateDepartmentDto);
}
