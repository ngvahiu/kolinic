package com.ngvahiu.kolinicserver.drug.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderItemDTO {
	private String drugId;
	private String quantity;
}
