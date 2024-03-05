package com.ngvahiu.kolinicserver.appointment;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ngvahiu.kolinicserver.department.Department;
import com.ngvahiu.kolinicserver.doctor.Doctor;
import com.ngvahiu.kolinicserver.feedback.Feedback;
import com.ngvahiu.kolinicserver.user.Gender;
import com.ngvahiu.kolinicserver.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "appointment")
public class Appointment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(nullable = false)
	private String patientName;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Gender gender;

	@Column(nullable = false)
	private int patientAge;

	@Column(nullable = false)
	private String contact;

	@Column(nullable = false)
	private String symptoms;

	@Column(nullable = false)
	private String appointmentAddress;

	@Column(nullable = false)
	private Date appointmentTime;

	@Column(nullable = false)
	@Builder.Default
	private boolean completed = false;

	@ManyToOne
	@JoinColumn(name = "userId", referencedColumnName = "id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "deparmentId", referencedColumnName = "id")
	private Department department;

	@ManyToOne
	@JoinColumn(name = "doctorId", referencedColumnName = "id")
	private Doctor doctor;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "feedbackId", referencedColumnName = "id")
    @JsonIgnore
    private Feedback feedback ;
}
