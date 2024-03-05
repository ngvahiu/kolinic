package com.ngvahiu.kolinicserver.drug.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateDrugCategoryDTO {
	@NotBlank(message = "Title should not be NULL or empty")
	private String title;
}
