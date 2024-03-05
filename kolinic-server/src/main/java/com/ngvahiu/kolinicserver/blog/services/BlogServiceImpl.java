package com.ngvahiu.kolinicserver.blog.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.blog.dtos.BlogDTO;
import com.ngvahiu.kolinicserver.blog.dtos.CreateBlogDTO;
import com.ngvahiu.kolinicserver.blog.dtos.UpdateBlogDTO;
import com.ngvahiu.kolinicserver.blog.entities.Blog;
import com.ngvahiu.kolinicserver.blog.repositories.BlogRepository;
import com.ngvahiu.kolinicserver.blog.repositories.BlogTypeRepository;
import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.storage.StorageService;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {
	private final BlogRepository blogRepo;
	private final BlogTypeRepository blogTypeRepo;
	private final StorageService storageService;
	private final ModelMapper modelMapper;
	
	@Override
	public APIResponse<?> createBlog(MultipartFile thumbnail,
			@Valid CreateBlogDTO createBlogDto) {
		try {
			var type = blogTypeRepo.findById(Long.parseLong(createBlogDto.getTypeId()))
					.orElseThrow(() -> new NotFoundException("Type ID not found"));
			
			String thumbnailUrl = storageService.uploadFile(thumbnail, "blogs");			
			Blog blog = Blog.builder().title(createBlogDto.getTitle())
								.content(createBlogDto.getContent())
								.postedAt(new Date())
								.thumbnail(thumbnailUrl)
								.type(type)
								.build();
			
			var savedBlog = blogRepo.save(blog);
			BlogDTO blogDto = modelMapper.map(savedBlog, BlogDTO.class);
			return APIResponse.builder().status("success").statusCode(201).data(blogDto).build();
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	public APIResponse<?> updateBlog(long id, MultipartFile thumbnail, @Valid UpdateBlogDTO updateBlogDto) {
		try {
			var blog = blogRepo.findById(id).orElseThrow(() -> new NotFoundException("Blog not found with id: " + id));
			
			if(updateBlogDto.getTitle()!= null) blog.setTitle(updateBlogDto.getTitle());
			if(updateBlogDto.getContent() != null) blog.setContent(updateBlogDto.getContent());
			if(updateBlogDto.getTypeId() != null) {
				var type = blogTypeRepo.findById(Long.parseLong(updateBlogDto.getTypeId()))
						.orElseThrow(() -> new NotFoundException("Type ID not found"));
				blog.setType(type);
			}
			if(thumbnail != null) {
				if(blog.getThumbnail() != null || blog.getThumbnail() != "") {
					storageService.deleteFile(blog.getThumbnail());
				}
				String thumbnailUrl = storageService.uploadFile(thumbnail, "blogs");
				blog.setThumbnail(thumbnailUrl);
			}
			
			var savedBlog = blogRepo.save(blog);
			BlogDTO blogDto = modelMapper.map(savedBlog, BlogDTO.class);
			return APIResponse.builder().status("success").statusCode(200).data(blogDto).build();
		} catch (Exception e) {
			throw e;
		}
	}
}
