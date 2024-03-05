package com.ngvahiu.kolinicserver.drug.services;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.doctor.Doctor;
import com.ngvahiu.kolinicserver.doctor.dtos.DoctorDTO;
import com.ngvahiu.kolinicserver.drug.dtos.CreateDrugCategoryDTO;
import com.ngvahiu.kolinicserver.drug.dtos.DrugCategoyDTO;
import com.ngvahiu.kolinicserver.drug.dtos.UpdateDrugCategoryDTO;
import com.ngvahiu.kolinicserver.drug.entities.DrugCategory;
import com.ngvahiu.kolinicserver.drug.repositories.DrugCategoryRepository;
import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.storage.StorageService;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DrugCategoryServiceImpl implements DrugCategoryService {
	private final DrugCategoryRepository drugCategoryRepo;
	private final StorageService storageService;
	private final ModelMapper modelMapper;
	
	@Override
	public APIResponse<?> createDrugCategory(MultipartFile img, @Valid CreateDrugCategoryDTO createDrugCategoryDto) {
		try {
			String imgUrl = storageService.uploadFile(img, "drugs");
			DrugCategory drugCategory = DrugCategory.builder()
						.title(createDrugCategoryDto.getTitle())
						.img(imgUrl)
						.build();
			var savedDrugCategory = drugCategoryRepo.save(drugCategory);
			DrugCategoyDTO drugCategoryDto = modelMapper.map(savedDrugCategory, DrugCategoyDTO.class);
			return APIResponse.builder().status("success").statusCode(201).data(drugCategoryDto).build();
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	public APIResponse<?> updateDrugCategory(long id, MultipartFile img,
			@Valid UpdateDrugCategoryDTO updateDrugCategoryDto) {
		try {
			var drugCategory = drugCategoryRepo.findById(id).orElseThrow(() -> new NotFoundException("Drug category not found with id: " + id));
			
			if(updateDrugCategoryDto.getTitle()!= null) drugCategory.setTitle(updateDrugCategoryDto.getTitle());			
			if(img != null) {
				if(drugCategory.getImg() != null || drugCategory.getImg() != "") {
					storageService.deleteFile(drugCategory.getImg());
				}
				String imgUrl = storageService.uploadFile(img, "drugs");
				drugCategory.setImg(imgUrl);
			}
			var savedDrugCategory = drugCategoryRepo.save(drugCategory);
			DrugCategoyDTO drugCategoryDto = modelMapper.map(savedDrugCategory, DrugCategoyDTO.class);
			return APIResponse.builder().status("success").statusCode(200).data(drugCategoryDto).build();
		} catch (Exception e) {
			throw e;
		}
	}

}
