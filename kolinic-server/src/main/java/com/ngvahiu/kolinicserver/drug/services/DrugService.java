package com.ngvahiu.kolinicserver.drug.services;

import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.drug.dtos.CreateDrugDTO;
import com.ngvahiu.kolinicserver.drug.dtos.CreateOrderDTO;
import com.ngvahiu.kolinicserver.drug.dtos.UpdateDrugDTO;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;

public interface DrugService {
	APIResponse<?> createDrug(MultipartFile img, @Valid CreateDrugDTO createDrugDto);
	APIResponse<?> updateDrug(long id, MultipartFile img, @Valid UpdateDrugDTO updateDrugDto);
	APIResponse<?> createOrder(String email, CreateOrderDTO createOrderDto);
}
