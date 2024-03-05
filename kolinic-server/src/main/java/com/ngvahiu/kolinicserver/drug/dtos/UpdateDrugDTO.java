package com.ngvahiu.kolinicserver.drug.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateDrugDTO {
	private String name;
	private String description;
	private String packSize;
	private String price;
	private String remaining;
	private String categoryId;
}
