package com.ngvahiu.kolinicserver.doctor;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.department.DepartmentRepository;
import com.ngvahiu.kolinicserver.doctor.dtos.CreateDoctorDTO;
import com.ngvahiu.kolinicserver.doctor.dtos.DoctorDTO;
import com.ngvahiu.kolinicserver.doctor.dtos.UpdateDoctorDTO;
import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.storage.StorageService;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {
	private final DoctorRepository doctorRepo;
	private final DepartmentRepository departmentRepo;
	private final StorageService storageService;
	private final ModelMapper modelMapper;

	@Override
	public APIResponse<?> createDoctor(MultipartFile avatar, @Valid CreateDoctorDTO createDoctorDto) throws Exception {
		try {
			String avatarUrl = storageService.uploadFile(avatar, "doctor");
			var dept = departmentRepo.findById(Long.parseLong(createDoctorDto.getDepartmentId()))
									.orElseThrow(() -> new NotFoundException("Department ID not found"));
			Date dob = new SimpleDateFormat("yyyy-MM-dd").parse(createDoctorDto.getDob());  
			Doctor doctor = Doctor.builder()
						.name(createDoctorDto.getName())
						.about(createDoctorDto.getAbout())
						.description(createDoctorDto.getDescription())
						.education(createDoctorDto.getEducation())
						.workingYear(Integer.parseInt(createDoctorDto.getWorkingYear()))
						.department(dept)
						.dob(dob)
						.avatar(avatarUrl)
						.build();
			var savedDoctor = doctorRepo.save(doctor);
			DoctorDTO doctorDto = modelMapper.map(savedDoctor, DoctorDTO.class);
			return APIResponse.builder().status("success").statusCode(201).data(doctorDto).build();
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	public APIResponse<?> updateDoctor(long id, MultipartFile avatar, @Valid UpdateDoctorDTO updateDoctorDto) throws Exception {
		try {
			var doctor = doctorRepo.findById(id).orElseThrow(() -> new NotFoundException("Doctor not found with id: " + id));
			
			if(updateDoctorDto.getName()!= null) doctor.setName(updateDoctorDto.getName());
			if(updateDoctorDto.getAbout() != null) doctor.setAbout(updateDoctorDto.getAbout());
			if(updateDoctorDto.getDescription() != null) doctor.setDescription(updateDoctorDto.getDescription());
			if(updateDoctorDto.getEducation() != null) doctor.setEducation(updateDoctorDto.getEducation());
			if(updateDoctorDto.getWorkingYear() != null) doctor.setWorkingYear(Integer.parseInt(updateDoctorDto.getWorkingYear()));
			if(updateDoctorDto.getDepartmentId() != null) {
				var dept = departmentRepo.findById(Long.parseLong(updateDoctorDto.getDepartmentId()))
						.orElseThrow(() -> new NotFoundException("Department ID not found"));
				doctor.setDepartment(dept);
			}
			if(updateDoctorDto.getDob() != null) {
				Date dob = new SimpleDateFormat("yyyy-MM-dd").parse(updateDoctorDto.getDob());  
				doctor.setDob(dob);
			}
			
			
			if(avatar != null) {
				if(doctor.getAvatar() != null || doctor.getAvatar() != "") {
					storageService.deleteFile(doctor.getAvatar());
				}
				String avatarUrl = storageService.uploadFile(avatar, "doctor");
				doctor.setAvatar(avatarUrl);
			}
			var savedDoctor = doctorRepo.save(doctor);
			DoctorDTO doctorDto = modelMapper.map(savedDoctor, DoctorDTO.class);
			return APIResponse.builder().status("success").statusCode(200).data(doctorDto).build();
		} catch (Exception e) {
			throw e;
		}
	}

}
