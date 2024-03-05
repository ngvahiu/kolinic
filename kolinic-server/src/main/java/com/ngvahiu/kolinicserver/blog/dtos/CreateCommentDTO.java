package com.ngvahiu.kolinicserver.blog.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateCommentDTO {
	@NotBlank(message = "Content should not be NULL or empty")
	private String content;
	
	@NotBlank(message = "Blog ID should not be NULL or empty")
	private String blogId;
}
