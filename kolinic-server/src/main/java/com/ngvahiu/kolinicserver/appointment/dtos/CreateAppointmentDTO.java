package com.ngvahiu.kolinicserver.appointment.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateAppointmentDTO {
	@NotBlank(message = "Name should not be NULL or empty")
	private String patientName;
	@NotBlank(message = "Gender should not be NULL or empty")
	private String gender;
	@NotBlank(message = "Age should not be NULL or empty")
	private String patientAge;
	@NotBlank(message = "Phone number should not be NULL or empty")
	@Pattern(regexp = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$", message = "Phone number must be in valid form")
	private String phoneNumber;
	@NotBlank(message = "Symptoms should not be NULL or empty")
	private String symptoms;
	@NotBlank(message = "Department ID should not be NULL or empty")
	private String departmentId;
	@NotBlank(message = "Doctor ID should not be NULL or empty")
	private String doctorId;
	@NotBlank(message = " should not be NULL or empty")
	@Pattern(regexp = "[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]", 
		message = "Date should be in form yyyy-mm-dd HH:mm")
	private String appointmentTime;
	@NotBlank(message = "Branch address should not be NULL or empty")
	private String appointmentAddress;	
}
