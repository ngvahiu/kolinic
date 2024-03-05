package com.ngvahiu.kolinicserver.doctor;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DoctorData {
	private String name;
	private String description;
	private String about;
	private String education;
	private String dob;
	private int workingYear;
	private long departmentId;
	private String avatar;
}
