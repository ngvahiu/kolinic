package com.ngvahiu.kolinicserver.drug;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DrugData {
	private String name;
	private int packSize;
	private int remaining;
	private double price;
	private String description;
	private String img;
	private long categoryId;
}
