package com.ngvahiu.kolinicserver.appointment;

import com.ngvahiu.kolinicserver.appointment.dtos.CreateAppointmentDTO;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;

public interface AppointmentService {
	APIResponse<?> createAppointment(String email, @Valid CreateAppointmentDTO createAppointmentDto) throws Exception;
}
