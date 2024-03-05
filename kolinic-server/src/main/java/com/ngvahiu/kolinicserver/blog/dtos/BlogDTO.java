package com.ngvahiu.kolinicserver.blog.dtos;

import java.util.Date;
import java.util.List;

import com.ngvahiu.kolinicserver.blog.entities.BlogType;
import com.ngvahiu.kolinicserver.blog.entities.Comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogDTO {
	private long id;
	private String title;
	private String content;
	private String thumbnail;
	private Date postedAt;
	private BlogType type;
	private List<Comment> comments;
}
