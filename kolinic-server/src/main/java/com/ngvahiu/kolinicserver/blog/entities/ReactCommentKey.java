package com.ngvahiu.kolinicserver.blog.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class ReactCommentKey {
	@Column(name = "comment_id")
    long commentId;

    @Column(name = "user_id")
    long userId;
}
