package com.ngvahiu.kolinicserver.feedback;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ngvahiu.kolinicserver.appointment.Appointment;
import com.ngvahiu.kolinicserver.doctor.Doctor;
import com.ngvahiu.kolinicserver.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
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
@Table(name = "feedback")
public class Feedback {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private int stars;
	
	@Column(nullable = false)
	private String text;
	
	@Column(nullable = false)
	private Date createdAt;
	
	@PrePersist
	protected void onCreateOrUpdate(){
	   this.setCreatedAt(new Date());
	}
	
	@ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "doctorId", referencedColumnName = "id")
    private Doctor doctor;
    
    @OneToOne
    @JoinColumn(name = "feedback", unique = true)
    @JsonIgnore
    private Appointment appointment;
}
