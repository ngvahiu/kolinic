package com.ngvahiu.kolinicserver.doctor;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ngvahiu.kolinicserver.appointment.Appointment;
import com.ngvahiu.kolinicserver.department.Department;
import com.ngvahiu.kolinicserver.feedback.Feedback;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "doctor")
public class Doctor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column
	private String description;
	@Column
	private String about;
	
	@Column(nullable = false)
	private String education;
	
	@Column(nullable = false)
	private Date dob;
	
	@Column(nullable = false)
	private int workingYear;
	
	@Column
	private String avatar;
	
	@ManyToOne
	@JoinColumn(name = "departmentId", referencedColumnName = "id")
	@JsonIgnore
	public Department department;
	
	@OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Feedback> feedbacks;
	
	@OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	@OnDelete(action = OnDeleteAction.SET_NULL)
	private List<Appointment> appointments;
}
