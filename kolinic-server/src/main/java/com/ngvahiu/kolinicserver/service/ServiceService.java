package com.ngvahiu.kolinicserver.service;

import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.service.dtos.CreateServiceDTO;
import com.ngvahiu.kolinicserver.service.dtos.UpdateServiceDTO;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;

public interface ServiceService {
	APIResponse<?> updateService(long id, MultipartFile logo, MultipartFile img, @Valid UpdateServiceDTO updateServiceDto);
	APIResponse<?> createService(MultipartFile logo, MultipartFile img, @Valid CreateServiceDTO createServiceDto);
}
