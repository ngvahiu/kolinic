package com.ngvahiu.kolinicserver.service;

import java.util.ArrayList;
import java.util.List;

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

import com.ngvahiu.kolinicserver.handler.CrudHandlerFactory;
import com.ngvahiu.kolinicserver.service.dtos.CreateServiceDTO;
import com.ngvahiu.kolinicserver.service.dtos.UpdateServiceDTO;
import com.ngvahiu.kolinicserver.storage.StorageService;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("services")
@RequiredArgsConstructor
public class ServiceController {
	private final ServiceRepository serviceRepo;
	private final CrudHandlerFactory<Service> crudService;
	private final ServiceService serviceService;
	private final StorageService storageService;

	@GetMapping
	public ResponseEntity<APIResponse<?>> getAllServices(@RequestParam(defaultValue = "0") int pageNo,
			@RequestParam(defaultValue = "-1") int pageSize, @RequestParam(defaultValue = "id") String sortBy,
			@RequestParam(defaultValue = "asc") String direc, @RequestParam(defaultValue = "") String search) {
		List<Service> services = new ArrayList<Service>();
		if(pageSize == -1) {
			services = serviceRepo.findByNameContaining(search);
		} else {
			services = crudService.getAll(serviceRepo, pageNo, pageSize, sortBy, direc);			
		}
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(services).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@GetMapping("{id}")
	public ResponseEntity<APIResponse<?>> getService(@PathVariable("id") long id) {
		Service service = crudService.getOne(serviceRepo, id);
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(service).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@PostMapping(path = "", consumes = { "multipart/form-data" })
	public ResponseEntity<APIResponse<?>> createService(
			@Valid @RequestPart(value = "body") CreateServiceDTO createServiceDto,
			@RequestPart(value = "logo") MultipartFile logo,
			@RequestPart(value = "img") MultipartFile img
	) {
		APIResponse<?> res = serviceService.createService(logo, img, createServiceDto);
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}

	@PatchMapping(path = "{id}", consumes = { "multipart/form-data" })
	public ResponseEntity<APIResponse<?>> updateService(@PathVariable("id") long id,
			@Valid @RequestPart(required = false, value = "body") UpdateServiceDTO updateServiceDto,
			@RequestPart(required = false, value = "logo") MultipartFile logo,
			@RequestPart(required = false, value = "img") MultipartFile img
	) {
		APIResponse<?> res = serviceService.updateService(id, logo, img, updateServiceDto);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<APIResponse<?>> deleteService(@PathVariable("id") long id) {
		Service service = this.crudService.deleteOne(serviceRepo, id);
		this.storageService.deleteFile(service.getLogo());
		this.storageService.deleteFile(service.getImg());
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(id).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
}
