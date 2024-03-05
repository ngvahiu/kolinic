package com.ngvahiu.kolinicserver.blog.services;

import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.blog.dtos.CreateBlogDTO;
import com.ngvahiu.kolinicserver.blog.dtos.UpdateBlogDTO;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;

public interface BlogService {
	APIResponse<?> createBlog(MultipartFile thumbnail, @Valid CreateBlogDTO createBlogDto);
	APIResponse<?> updateBlog(long id, MultipartFile thumbnail, @Valid UpdateBlogDTO updateBlogDto);
}
