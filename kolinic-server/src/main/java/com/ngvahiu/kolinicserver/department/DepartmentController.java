package com.ngvahiu.kolinicserver.department;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.department.dtos.CreateDepartmentDTO;
import com.ngvahiu.kolinicserver.department.dtos.DepartmentDTO;
import com.ngvahiu.kolinicserver.department.dtos.UpdateDepartmentDTO;
import com.ngvahiu.kolinicserver.handler.CrudHandlerFactory;
import com.ngvahiu.kolinicserver.storage.StorageService;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("departments")
@RequiredArgsConstructor
public class DepartmentController {
	private final DepartmentRepository departmentRepo;
	private final CrudHandlerFactory<Department> crudService;
	private final DepartmentService departmentService;
	private final StorageService storageService;
	private final ModelMapper modelMapper;
	
	@GetMapping
	public ResponseEntity<?> getAllDepartments(@RequestParam(defaultValue = "0") int pageNo,
			@RequestParam(defaultValue = "10") int pageSize, @RequestParam(defaultValue = "id") String sortBy,
			@RequestParam(defaultValue = "asc") String direc) {
		List<Department> departments = crudService.getAll(departmentRepo, pageNo, pageSize, sortBy, direc);
		List<DepartmentDTO> departmentDtos = new ArrayList<DepartmentDTO>();
		departments.forEach(department -> {
			DepartmentDTO depDto = modelMapper.map(department, DepartmentDTO.class);
			departmentDtos.add(depDto);
		});
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(departmentDtos).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<APIResponse<?>> getDepartment(@PathVariable("id") long id) {
		Department department = crudService.getOne(departmentRepo, id);
		DepartmentDTO depDto = modelMapper.map(department, DepartmentDTO.class);
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(depDto).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@PostMapping(path = "", consumes = { "multipart/form-data" })
	public ResponseEntity<APIResponse<?>> createDepartment(
			@Valid @RequestPart("body") CreateDepartmentDTO createDepartmentDto,
			@RequestPart("logo") MultipartFile logo,
			@RequestPart("img") MultipartFile img) {
		APIResponse<?> res = departmentService.createDepartment(logo, img, createDepartmentDto);
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}
	
	@PatchMapping(path = "{id}", consumes = { "multipart/form-data" })
	public ResponseEntity<APIResponse<?>> updateDepartment(@PathVariable("id") long id,
			@Valid @RequestPart(required = false, value = "body") UpdateDepartmentDTO updateDepartmentDto,
			@RequestPart(required = false, value = "logo") MultipartFile logo,
			@RequestPart(required = false, value = "img") MultipartFile img) {
		APIResponse<?> res = departmentService.updateDepartment(id, logo, img, updateDepartmentDto);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<APIResponse<?>> deleteDepartment(@PathVariable("id") long id) {
		Department department = this.crudService.deleteOne(departmentRepo, id);
		this.storageService.deleteFile(department.getLogo());
		this.storageService.deleteFile(department.getImg());
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(id).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
}
