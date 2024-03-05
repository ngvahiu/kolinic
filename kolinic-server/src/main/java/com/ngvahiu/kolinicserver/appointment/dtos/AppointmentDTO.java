package com.ngvahiu.kolinicserver.appointment.dtos;

import java.util.Date;

import com.ngvahiu.kolinicserver.department.Department;
import com.ngvahiu.kolinicserver.doctor.Doctor;
import com.ngvahiu.kolinicserver.feedback.Feedback;
import com.ngvahiu.kolinicserver.user.Gender;
import com.ngvahiu.kolinicserver.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentDTO {
	private long id;
	private String patientName;
	private Gender gender;
	private int patientAge;
	private String contact;
	private String symptoms;
	private String appointmentAddress;
	private Date appointmentTime;
	private boolean completed;
	private User user;
	private Department department;
	private Doctor doctor;
	private Feedback feedback;
}
