package com.ngvahiu.kolinicserver.feedback.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateFeedbackDTO {
	@NotBlank(message = "Stars should not be NULL or empty")
	private String stars;
	@NotBlank(message = "Text should not be NULL or empty")
	private String text;
	@NotBlank(message = "User ID should not be NULL or empty")
	private String userId;
	@NotBlank(message = "Doctor ID should not be NULL or empty")
	private String doctorId;
	@NotBlank(message = "Appointment ID should not be NULL or empty")
	private String appointmentId;
}
