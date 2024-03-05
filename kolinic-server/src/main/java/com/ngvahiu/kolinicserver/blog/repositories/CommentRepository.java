package com.ngvahiu.kolinicserver.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ngvahiu.kolinicserver.blog.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
