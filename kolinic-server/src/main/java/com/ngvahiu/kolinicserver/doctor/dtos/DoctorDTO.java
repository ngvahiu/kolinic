package com.ngvahiu.kolinicserver.doctor.dtos;

import java.util.Date;
import java.util.List;

import com.ngvahiu.kolinicserver.appointment.Appointment;
import com.ngvahiu.kolinicserver.department.Department;
import com.ngvahiu.kolinicserver.feedback.Feedback;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorDTO {
	private long id;
	private String name;
	private String avatar;
	private String about;
	private String education;
	private String description;
	private int workingYear;
	private Date dob;
	private Department department;
	private List<Feedback> feedbacks;
	private List<Appointment> appointments;
}
