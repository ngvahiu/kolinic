package com.ngvahiu.kolinicserver.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ngvahiu.kolinicserver.blog.entities.BlogType;

public interface BlogTypeRepository extends JpaRepository<BlogType, Long> {
}
