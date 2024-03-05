package com.ngvahiu.kolinicserver.blog.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateBlogDTO {
	private String title;
	private String content;
	private String typeId;
}
