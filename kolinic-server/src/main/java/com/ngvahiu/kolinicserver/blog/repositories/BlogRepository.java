package com.ngvahiu.kolinicserver.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ngvahiu.kolinicserver.blog.entities.Blog;

public interface BlogRepository extends JpaRepository<Blog, Long> {

}
