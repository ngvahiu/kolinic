package com.ngvahiu.kolinicserver.feedback.dtos;

import java.util.Date;

import com.ngvahiu.kolinicserver.appointment.Appointment;
import com.ngvahiu.kolinicserver.doctor.Doctor;
import com.ngvahiu.kolinicserver.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedbackDTO {
private long id;
	private int stars;
	private String text;
	private Date createdAt;
    private User user;
    private Doctor doctor;
    private Appointment appointment;
}
