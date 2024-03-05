package com.ngvahiu.kolinicserver.doctor.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateDoctorDTO {
	@NotBlank(message = "Name should not be NULL or empty")
	private String name;
	@NotBlank(message = "About should not be NULL or empty")
	private String about;
	@NotBlank(message = "Education should not be NULL or empty")
	private String education;
	@NotBlank(message = "Description should not be NULL or empty")
	private String description;
	@NotBlank(message = "Working year should not be NULL or empty")
	private String workingYear;
	@NotBlank(message = "Date of birth should not be NULL or empty")
	@Pattern(regexp = "[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])", message = "Date should be in form yyyy-mm-dd")
	private String dob;
	@NotBlank(message = "Department ID should not be NULL or empty")
	private String departmentId;
}
