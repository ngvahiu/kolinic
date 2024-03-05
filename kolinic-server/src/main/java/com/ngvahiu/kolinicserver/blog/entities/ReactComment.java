package com.ngvahiu.kolinicserver.blog.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ngvahiu.kolinicserver.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
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
@Table(name = "react_comment")
public class ReactComment {
	@EmbeddedId
	private ReactCommentKey id;
	
	@ManyToOne
    @MapsId("commentId")
    @JoinColumn(name = "comment_id")
	@JsonIgnore
    private Comment comment;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    
    @Column(nullable = false)
    private boolean isLike;
}
