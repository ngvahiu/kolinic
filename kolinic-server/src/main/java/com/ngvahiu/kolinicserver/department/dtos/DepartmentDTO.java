package com.ngvahiu.kolinicserver.department.dtos;

import java.util.List;

import com.ngvahiu.kolinicserver.doctor.Doctor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentDTO {
	private long id;
	private String name;
	private String functions;
	private String description;
	private String logo;
	private String img;
	private List<Doctor> doctors;
}
