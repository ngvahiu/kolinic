package com.ngvahiu.kolinicserver.department.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateDepartmentDTO {
	@NotBlank(message = "Name should not be NULL or empty")
	private String name;
	@NotBlank(message = "Functions should not be NULL or empty")
	private String functions;
	@NotBlank(message = "Description should not be NULL or empty")
	private String description;
}
