package com.ngvahiu.kolinicserver.drug.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateDrugDTO {
	@NotBlank(message = "Name should not be NULL or empty")
	private String name;
	@NotBlank(message = "Description should not be NULL or empty")
	private String description;
	@NotBlank(message = "Pack size should not be NULL or empty")
	private String packSize;
	@NotBlank(message = "Price should not be NULL or empty")
	private String price;
	@NotBlank(message = "Remaining should not be NULL or empty")
	private String remaining;
	@NotBlank(message = "Category ID should not be NULL or empty")
	private String categoryId;
}
