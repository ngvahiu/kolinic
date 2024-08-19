package com.ngvahiu.kolinicserver.feedback;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.ngvahiu.kolinicserver.appointment.Appointment;
import com.ngvahiu.kolinicserver.appointment.AppointmentRepository;
import com.ngvahiu.kolinicserver.doctor.Doctor;
import com.ngvahiu.kolinicserver.doctor.DoctorRepository;
import com.ngvahiu.kolinicserver.drug.dtos.DrugDTO;
import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.feedback.dtos.CreateFeedbackDTO;
import com.ngvahiu.kolinicserver.feedback.dtos.FeedbackDTO;
import com.ngvahiu.kolinicserver.user.User;
import com.ngvahiu.kolinicserver.user.UserRepository;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FeedbackServiceImpl implements FeedbackService {
	private final FeedbackRepository feedbackRepo;
	private final UserRepository userRepo;
	private final DoctorRepository doctorRepo;
	private final AppointmentRepository appointmentRepo;
	private final ModelMapper modelMapper;

	@Override
	@Transactional
	public APIResponse<?> createDrug(@Valid CreateFeedbackDTO createFeedbackDto) {
		try {
			User user = userRepo.findById(Long.parseLong(createFeedbackDto.getUserId()))
					.orElseThrow(() -> new NotFoundException("User not found"));
			Doctor doctor = doctorRepo.findById(Long.parseLong(createFeedbackDto.getDoctorId()))
					.orElseThrow(() -> new NotFoundException("Doctor not found"));
			Appointment appointment = appointmentRepo.findById(Long.parseLong(createFeedbackDto.getAppointmentId()))
					.orElseThrow(() -> new NotFoundException("Appointment not found"));

			Feedback feedback = Feedback.builder().stars(Integer.parseInt(createFeedbackDto.getStars()))
					.text(createFeedbackDto.getText()).user(user).doctor(doctor).appointment(appointment).build();
			
			Feedback savedFeedback = feedbackRepo.save(feedback);
			appointment.setFeedback(savedFeedback);
			appointmentRepo.save(appointment);
			
			FeedbackDTO feedbackDto = modelMapper.map(savedFeedback, FeedbackDTO.class);
			return APIResponse.builder().status("success").statusCode(201).data(feedbackDto).build();
		} catch (Exception e) {
			throw e;
		}
	}
}
