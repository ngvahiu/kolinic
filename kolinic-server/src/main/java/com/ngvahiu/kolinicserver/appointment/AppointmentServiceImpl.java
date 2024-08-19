package com.ngvahiu.kolinicserver.appointment;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.ngvahiu.kolinicserver.appointment.dtos.AppointmentDTO;
import com.ngvahiu.kolinicserver.appointment.dtos.CreateAppointmentDTO;
import com.ngvahiu.kolinicserver.department.Department;
import com.ngvahiu.kolinicserver.department.DepartmentRepository;
import com.ngvahiu.kolinicserver.doctor.Doctor;
import com.ngvahiu.kolinicserver.doctor.DoctorRepository;
import com.ngvahiu.kolinicserver.exception.BadRequestException;
import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.user.Gender;
import com.ngvahiu.kolinicserver.user.User;
import com.ngvahiu.kolinicserver.user.UserRepository;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AppointmentServiceImpl implements AppointmentService {
	private final UserRepository userRepo;
	private final DepartmentRepository departmentRepo;
	private final DoctorRepository doctorRepo;
	private final AppointmentRepository appointmentRepo;
	private final ModelMapper modelMapper;
	
	@Override
	@Transactional
	public APIResponse<?> createAppointment(String email, @Valid CreateAppointmentDTO createAppointmentDto) throws Exception {
		try {
			User user = userRepo.findByEmail(email).orElseThrow(() -> new NotFoundException("User email not found"));
			Department department = departmentRepo.findById(Long.parseLong(createAppointmentDto.getDepartmentId()))
									.orElseThrow(() -> new NotFoundException("Department ID not found"));
			Doctor doctor = doctorRepo.findById(Long.parseLong(createAppointmentDto.getDoctorId()))
									.orElseThrow(() -> new NotFoundException("Doctor ID not found"));
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.ENGLISH);
			Date appDate = formatter.parse(createAppointmentDto.getAppointmentTime());
			Optional<Appointment> checkApp = appointmentRepo.findAppointmentByDoctorIdAndAppointmentTime(doctor.getId(), appDate);
			if(checkApp.isPresent()) {
				throw new BadRequestException("Your selected doctor has another appointment at this time !");
			}
			Appointment app = Appointment.builder()
								.patientName(createAppointmentDto.getPatientName())
								.patientAge(Integer.parseInt(createAppointmentDto.getPatientAge()))
								.gender(Gender.valueOf(createAppointmentDto.getGender()))
								.contact(createAppointmentDto.getPhoneNumber())
								.symptoms(createAppointmentDto.getSymptoms())
								.appointmentAddress(createAppointmentDto.getAppointmentAddress())
								.appointmentTime(appDate)
								.user(user)
								.department(department)
								.doctor(doctor)
								.build();
			Appointment savedApp = appointmentRepo.save(app);
			AppointmentDTO appDto = modelMapper.map(savedApp, AppointmentDTO.class);
			return APIResponse.builder().status("success").statusCode(201).data(email).build();
		} catch (Exception e) {
			throw e;
		}
	}
}
