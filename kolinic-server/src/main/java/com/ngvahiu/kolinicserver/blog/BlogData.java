package com.ngvahiu.kolinicserver.blog;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BlogData {
	private String title;
	private String content;
	private String thumbnail;
	private String postedAt;
	private long typeId;
}
