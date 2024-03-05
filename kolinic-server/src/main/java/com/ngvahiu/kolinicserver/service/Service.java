package com.ngvahiu.kolinicserver.service;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "service")
public class Service {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false, length = 1023)
	private String description;
	
	@Column(nullable = false, length = 511)
	private String functions;
	
	@Column(nullable = false, length = 1023)
	private String benefits;
	
	@Column(nullable = false)
	private String logo;
	
	@Column(nullable = false)
	private String img;
}
