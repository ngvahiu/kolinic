package com.ngvahiu.kolinicserver.service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.service.dtos.CreateServiceDTO;
import com.ngvahiu.kolinicserver.service.dtos.UpdateServiceDTO;
import com.ngvahiu.kolinicserver.storage.StorageService;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ServiceServiceImpl implements ServiceService {
	private final ServiceRepository serviceRepo;
	private final StorageService storageService;

	@Override
	@Transactional
	public APIResponse<?> updateService(long id, MultipartFile logo, MultipartFile img, @Valid UpdateServiceDTO updateServiceDto) {
		try {
			var service = serviceRepo.findById(id).orElseThrow(() -> new NotFoundException("Service not found with id: " + id));
			
			if(updateServiceDto.getName()!= null) service.setName(updateServiceDto.getName());
			if(updateServiceDto.getFunctions() != null) service.setFunctions(updateServiceDto.getFunctions());
			if(updateServiceDto.getDescription() != null) service.setDescription(updateServiceDto.getDescription());
			if(updateServiceDto.getBenefits() != null) service.setBenefits(updateServiceDto.getBenefits());
			if(logo != null) {
				if(service.getLogo() != null || service.getLogo() != "") {
					storageService.deleteFile(service.getLogo());
				}
				String url = storageService.uploadFile(logo, "services-logo");
				service.setLogo(url);
			}
			if(img != null) {
				if(service.getImg() != null || service.getImg() != "") {
					storageService.deleteFile(service.getImg());
				}
				String url = storageService.uploadFile(logo, "services-logo");
				service.setImg(url);
			}
			var savedService = serviceRepo.save(service);
			return APIResponse.builder().status("success").statusCode(200).data(savedService).build();
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	@Transactional
	public APIResponse<?> createService(MultipartFile logo, MultipartFile img, @Valid CreateServiceDTO createServiceDto) {
		try {
			String logoUrl = storageService.uploadFile(logo, "services-logo");
			String imgUrl = storageService.uploadFile(img, "services-logo");
			Service service = Service.builder()
									.name(createServiceDto.getName())
									.functions(createServiceDto.getFunctions())
									.benefits(createServiceDto.getBenefits())
									.description(createServiceDto.getDescription())
									.logo(logoUrl)
									.img(imgUrl)
									.build();
			var savedService = serviceRepo.save(service);
			return APIResponse.builder().status("success").statusCode(201).data(savedService).build();
		} catch (Exception e) {
			throw e;
		}
	}
}
