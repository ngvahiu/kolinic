package com.ngvahiu.kolinicserver.blog.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ngvahiu.kolinicserver.blog.entities.ReactComment;

public interface ReactCommentRepository extends JpaRepository<ReactComment, Long> {
	Optional<ReactComment> findByCommentIdAndUserId(long commentId, long userId);
}
