package com.ngvahiu.kolinicserver.doctor;

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

import com.ngvahiu.kolinicserver.doctor.dtos.CreateDoctorDTO;
import com.ngvahiu.kolinicserver.doctor.dtos.DoctorDTO;
import com.ngvahiu.kolinicserver.doctor.dtos.UpdateDoctorDTO;
import com.ngvahiu.kolinicserver.handler.CrudHandlerFactory;
import com.ngvahiu.kolinicserver.storage.StorageService;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("doctors")
@RequiredArgsConstructor
public class DoctorController {
	private final CrudHandlerFactory<Doctor> crudService;
	private final StorageService storageService;
	private final DoctorService doctorService;
	private final DoctorRepository doctorRepo;
	private final ModelMapper modelMapper;
	
	@GetMapping
	public ResponseEntity<?> getAllDoctors(@RequestParam(defaultValue = "0") int pageNo,
			@RequestParam(defaultValue = "-1") int pageSize, @RequestParam(defaultValue = "id") String sortBy,
			@RequestParam(defaultValue = "asc") String direc, @RequestParam(defaultValue = "") String search) {
		List<Doctor> doctors = new ArrayList<Doctor>();
		if(pageSize == -1) {
			doctors = doctorRepo.findByNameContaining(search);
		} else {
			doctors = crudService.getAll(doctorRepo, pageNo, pageSize, sortBy, direc);			
		}
		
		List<DoctorDTO> doctorDtos = new ArrayList<DoctorDTO>();
		doctors.forEach(doctor -> {
			DoctorDTO doctorDto = modelMapper.map(doctor, DoctorDTO.class);
			doctorDtos.add(doctorDto);
		});
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(doctorDtos).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<APIResponse<?>> getDoctor(@PathVariable("id") long id) {
		Doctor doctor = crudService.getOne(doctorRepo, id);
		DoctorDTO doctorDto = modelMapper.map(doctor, DoctorDTO.class);
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(doctorDto).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@PostMapping(path = "", consumes = { "multipart/form-data" })
	public ResponseEntity<APIResponse<?>> createDoctor(
			@Valid @RequestPart("body") CreateDoctorDTO createDoctorDto,
			@RequestPart("avatar") MultipartFile avatar) throws Exception {
		APIResponse<?> res = doctorService.createDoctor(avatar, createDoctorDto);
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}
	
	@PatchMapping(path = "{id}", consumes = { "multipart/form-data" })
	public ResponseEntity<APIResponse<?>> updateDoctor(@PathVariable("id") long id,
			@Valid @RequestPart(required = false, value = "body") UpdateDoctorDTO updateDoctorDto,
			@RequestPart(required = false, value = "avatar") MultipartFile avatar) throws Exception {
		APIResponse<?> res = doctorService.updateDoctor(id, avatar, updateDoctorDto);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<APIResponse<?>> deleteDoctor(@PathVariable("id") long id) {
		Doctor doctor = this.crudService.deleteOne(doctorRepo, id);
		this.storageService.deleteFile(doctor.getAvatar());
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(id).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
}
