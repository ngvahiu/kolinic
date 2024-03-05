package com.ngvahiu.kolinicserver.drug.dtos;

import java.util.List;

import com.ngvahiu.kolinicserver.department.dtos.DepartmentDTO;
import com.ngvahiu.kolinicserver.doctor.Doctor;
import com.ngvahiu.kolinicserver.drug.entities.Drug;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DrugCategoyDTO {
	private long id;
	private String title;
	private String img;
	private List<Drug> drugs;
}
