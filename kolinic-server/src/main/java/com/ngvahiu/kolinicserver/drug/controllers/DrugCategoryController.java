package com.ngvahiu.kolinicserver.drug.controllers;

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

import com.ngvahiu.kolinicserver.doctor.dtos.DoctorDTO;
import com.ngvahiu.kolinicserver.drug.dtos.CreateDrugCategoryDTO;
import com.ngvahiu.kolinicserver.drug.dtos.DrugCategoyDTO;
import com.ngvahiu.kolinicserver.drug.dtos.UpdateDrugCategoryDTO;
import com.ngvahiu.kolinicserver.drug.entities.DrugCategory;
import com.ngvahiu.kolinicserver.drug.repositories.DrugCategoryRepository;
import com.ngvahiu.kolinicserver.drug.services.DrugCategoryService;
import com.ngvahiu.kolinicserver.handler.CrudHandlerFactory;
import com.ngvahiu.kolinicserver.storage.StorageService;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("drug-categories")
@RequiredArgsConstructor
public class DrugCategoryController {
	private final CrudHandlerFactory<DrugCategory> crudService;
	private final StorageService storageService;
	private final DrugCategoryService drugCategoryService;
	private final DrugCategoryRepository drugCategoryRepo;
	private final ModelMapper modelMapper;
	
	@GetMapping
	public ResponseEntity<?> getAllDrugCategories(@RequestParam(defaultValue = "0") int pageNo,
			@RequestParam(defaultValue = "10") int pageSize, @RequestParam(defaultValue = "id") String sortBy,
			@RequestParam(defaultValue = "asc") String direc) {
		List<DrugCategory> drugCategories = crudService.getAll(drugCategoryRepo, pageNo, pageSize, sortBy, direc);
		List<DrugCategoyDTO> drugCategoryDtos = new ArrayList<DrugCategoyDTO>();
		drugCategories.forEach(drugCategory -> {
			DrugCategoyDTO drugCategoryDto = modelMapper.map(drugCategory, DrugCategoyDTO.class);
			drugCategoryDtos.add(drugCategoryDto);
		});
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(drugCategoryDtos).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<APIResponse<?>> getDrugCategory(@PathVariable("id") long id) {
		DrugCategory drugCategory = crudService.getOne(drugCategoryRepo, id);
		DrugCategoyDTO drugCategoryDto = modelMapper.map(drugCategory, DrugCategoyDTO.class);
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(drugCategoryDto).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@PostMapping(path = "", consumes = { "multipart/form-data" })
	public ResponseEntity<APIResponse<?>> createDrugCategory(
			@Valid @RequestPart("body") CreateDrugCategoryDTO createDrugCategoryDto,
			@RequestPart("img") MultipartFile img) {
		APIResponse<?> res = drugCategoryService.createDrugCategory(img, createDrugCategoryDto);
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}
	
	@PatchMapping(path = "{id}", consumes = { "multipart/form-data" })
	public ResponseEntity<APIResponse<?>> updateDrugCategory(@PathVariable("id") long id,
			@Valid @RequestPart(required = false, value = "body") UpdateDrugCategoryDTO updateDrugCategoryDto,
			@RequestPart(required = false, value = "img") MultipartFile img) {
		APIResponse<?> res = drugCategoryService.updateDrugCategory(id, img, updateDrugCategoryDto);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<APIResponse<?>> deleteDrugCategory(@PathVariable("id") long id) {
		DrugCategory drugCategory = this.crudService.deleteOne(drugCategoryRepo, id);
		this.storageService.deleteFile(drugCategory.getImg());
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(id).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
}
