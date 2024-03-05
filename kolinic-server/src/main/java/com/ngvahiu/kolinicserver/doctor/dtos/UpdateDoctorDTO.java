package com.ngvahiu.kolinicserver.doctor.dtos;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateDoctorDTO {
	private String name;
	private String about;
	private String education;
	private String description;
	private String workingYear;
	@Pattern(regexp = "[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])", message = "Date should be in form YYYY-MM-DD")
	private String dob;
	private String departmentId;
}
