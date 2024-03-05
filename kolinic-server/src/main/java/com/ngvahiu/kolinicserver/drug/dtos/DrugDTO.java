package com.ngvahiu.kolinicserver.drug.dtos;

import com.ngvahiu.kolinicserver.drug.entities.DrugCategory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DrugDTO {
	private long id;
	private String name;
	private String description;
	private String img;
	private int remaining;
	private double price;
	private int packSize;
	private DrugCategory category;
}
