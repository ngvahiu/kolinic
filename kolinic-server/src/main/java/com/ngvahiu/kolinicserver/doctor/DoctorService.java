package com.ngvahiu.kolinicserver.doctor;

import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.doctor.dtos.CreateDoctorDTO;
import com.ngvahiu.kolinicserver.doctor.dtos.UpdateDoctorDTO;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;

public interface DoctorService {
	APIResponse<?> createDoctor(MultipartFile avatar, @Valid CreateDoctorDTO createDoctorDto) throws Exception;
	APIResponse<?> updateDoctor(long id, MultipartFile avatar, @Valid UpdateDoctorDTO updateDoctorDto) throws Exception;
}
