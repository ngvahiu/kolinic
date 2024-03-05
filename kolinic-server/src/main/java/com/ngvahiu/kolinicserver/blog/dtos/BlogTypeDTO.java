package com.ngvahiu.kolinicserver.blog.dtos;

import java.util.Date;
import java.util.List;

import com.ngvahiu.kolinicserver.blog.entities.Blog;
import com.ngvahiu.kolinicserver.blog.entities.BlogType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogTypeDTO {
	private long id;
	private String name;
	private List<Blog> blogs;
}
