package com.ngvahiu.kolinicserver.service.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateServiceDTO {
	private String name;
	private String functions;
	private String benefits;
	private String description;
}
