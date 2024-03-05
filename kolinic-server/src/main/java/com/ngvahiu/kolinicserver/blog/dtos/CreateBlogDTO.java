package com.ngvahiu.kolinicserver.blog.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateBlogDTO {
	@NotBlank(message = "Title should not be NULL or empty")
	private String title;
	
	@NotBlank(message = "Content should not be NULL or empty")
	private String content;
	
	@NotBlank(message = "Content should not be NULL or empty")
	private String typeId;
}
