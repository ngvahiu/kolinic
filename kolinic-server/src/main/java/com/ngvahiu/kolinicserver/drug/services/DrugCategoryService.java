package com.ngvahiu.kolinicserver.drug.services;

import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.drug.dtos.CreateDrugCategoryDTO;
import com.ngvahiu.kolinicserver.drug.dtos.UpdateDrugCategoryDTO;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;

public interface DrugCategoryService {
	APIResponse<?> createDrugCategory(MultipartFile img, @Valid CreateDrugCategoryDTO createDrugCategoryDto);
	APIResponse<?> updateDrugCategory(long id, MultipartFile img, @Valid UpdateDrugCategoryDTO updateDrugCategoryDto);
}
