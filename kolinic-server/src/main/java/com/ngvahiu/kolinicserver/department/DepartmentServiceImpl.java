package com.ngvahiu.kolinicserver.department;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.department.dtos.CreateDepartmentDTO;
import com.ngvahiu.kolinicserver.department.dtos.DepartmentDTO;
import com.ngvahiu.kolinicserver.department.dtos.UpdateDepartmentDTO;
import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.storage.StorageService;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DepartmentServiceImpl implements DepartmentService {
	private final DepartmentRepository departmentRepo;
	private final StorageService storageService;
	private final ModelMapper modelMapper;

	@Override
	@Transactional
	public APIResponse<?> createDepartment(MultipartFile logo, MultipartFile img,
			@Valid CreateDepartmentDTO createDepartmentDto) {
		try {
			String logoUrl = storageService.uploadFile(logo, "deparment");
			String imgUrl = storageService.uploadFile(img, "deparment");
			Department department = Department.builder().name(createDepartmentDto.getName())
					.functions(createDepartmentDto.getFunctions())
					.description(createDepartmentDto.getDescription()).logo(logoUrl).img(imgUrl).build();
			var savedDepartment = departmentRepo.save(department);
			DepartmentDTO depDto = modelMapper.map(savedDepartment, DepartmentDTO.class);
			return APIResponse.builder().status("success").statusCode(201).data(depDto).build();
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	@Transactional
	public APIResponse<?> updateDepartment(long id, MultipartFile logo, MultipartFile img,
			@Valid UpdateDepartmentDTO updateDepartmentDto) {
		try {
			var department = departmentRepo.findById(id).orElseThrow(() -> new NotFoundException("Department not found with id: " + id));
			
			if(updateDepartmentDto.getName()!= null) department.setName(updateDepartmentDto.getName());
			if(updateDepartmentDto.getFunctions() != null) department.setFunctions(updateDepartmentDto.getFunctions());
			if(updateDepartmentDto.getDescription() != null) department.setDescription(updateDepartmentDto.getDescription());
			if(logo != null) {
				if(department.getLogo() != null || department.getLogo() != "") {
					storageService.deleteFile(department.getLogo());
				}
				String logoUrl = storageService.uploadFile(logo, "department");
				department.setLogo(logoUrl);
			}
			if(img != null) {
				if(department.getImg() != null || department.getImg() != "") {
					storageService.deleteFile(department.getImg());
				}
				String imgUrl = storageService.uploadFile(img, "department");
				department.setImg(imgUrl);
			}
			var savedDepartment = departmentRepo.save(department);
			DepartmentDTO depDto = modelMapper.map(savedDepartment, DepartmentDTO.class);
			return APIResponse.builder().status("success").statusCode(200).data(depDto).build();
		} catch (Exception e) {
			throw e;
		}
	}
}
