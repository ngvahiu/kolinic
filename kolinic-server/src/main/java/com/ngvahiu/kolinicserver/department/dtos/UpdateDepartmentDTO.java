package com.ngvahiu.kolinicserver.department.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateDepartmentDTO {
	private String name;
	private String functions;
	private String description;
}
