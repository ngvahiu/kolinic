package com.ngvahiu.kolinicserver.blog.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.blog.dtos.BlogDTO;
import com.ngvahiu.kolinicserver.blog.dtos.BlogTypeDTO;
import com.ngvahiu.kolinicserver.blog.dtos.CreateBlogDTO;
import com.ngvahiu.kolinicserver.blog.dtos.CreateCommentDTO;
import com.ngvahiu.kolinicserver.blog.dtos.UpdateBlogDTO;
import com.ngvahiu.kolinicserver.blog.dtos.UpdateCommentDTO;
import com.ngvahiu.kolinicserver.blog.entities.Blog;
import com.ngvahiu.kolinicserver.blog.entities.BlogType;
import com.ngvahiu.kolinicserver.blog.entities.Comment;
import com.ngvahiu.kolinicserver.blog.entities.ReactComment;
import com.ngvahiu.kolinicserver.blog.entities.ReactCommentKey;
import com.ngvahiu.kolinicserver.blog.repositories.BlogRepository;
import com.ngvahiu.kolinicserver.blog.repositories.BlogTypeRepository;
import com.ngvahiu.kolinicserver.blog.repositories.CommentRepository;
import com.ngvahiu.kolinicserver.blog.repositories.ReactCommentRepository;
import com.ngvahiu.kolinicserver.blog.services.BlogService;
import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.handler.CrudHandlerFactory;
import com.ngvahiu.kolinicserver.storage.StorageService;
import com.ngvahiu.kolinicserver.user.User;
import com.ngvahiu.kolinicserver.user.UserRepository;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("blogs")
@RequiredArgsConstructor
public class BlogController {
	private final CrudHandlerFactory<Blog> crudServiceForBlog;
	private final CrudHandlerFactory<BlogType> crudServiceForBlogType;
	private final CrudHandlerFactory<Comment> crudServiceForComment;
	private final CrudHandlerFactory<ReactComment> crudServiceForReactComment;
	private final StorageService storageService;
	private final BlogService blogService;
	private final BlogRepository blogRepo;
	private final BlogTypeRepository blogTypeRepo;
	private final CommentRepository commentRepo;
	private final ReactCommentRepository reactCommentRepo;
	private final UserRepository userRepo;
	private final ModelMapper modelMapper;
	
	@GetMapping("/types")
	public ResponseEntity<?> getAllBlogTypes(@RequestParam(defaultValue = "0") int pageNo,
			@RequestParam(defaultValue = "10") int pageSize, @RequestParam(defaultValue = "id") String sortBy,
			@RequestParam(defaultValue = "asc") String direc) {
		List<BlogType> blogTypes = crudServiceForBlogType.getAll(blogTypeRepo, pageNo, pageSize, sortBy, direc);
		List<BlogTypeDTO> blogTypeDtos = new ArrayList<BlogTypeDTO>();
		blogTypes.forEach(blogType -> {
			BlogTypeDTO blogTypeDTO = modelMapper.map(blogType, BlogTypeDTO.class);
			blogTypeDtos.add(blogTypeDTO);
		});
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(blogTypeDtos).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@GetMapping("/types/{id}")
	public ResponseEntity<APIResponse<?>> getBlogType(@PathVariable("id") long id) {
		BlogType blogType = crudServiceForBlogType.getOne(blogTypeRepo, id);
		BlogTypeDTO blogTypeDTO = modelMapper.map(blogType, BlogTypeDTO.class);
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(blogTypeDTO).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<?> getAllBlogs(@RequestParam(defaultValue = "0") int pageNo,
			@RequestParam(defaultValue = "10") int pageSize, @RequestParam(defaultValue = "id") String sortBy,
			@RequestParam(defaultValue = "asc") String direc) {
		List<Blog> blogs = crudServiceForBlog.getAll(blogRepo, pageNo, pageSize, sortBy, direc);
		List<BlogDTO> blogDtos = new ArrayList<BlogDTO>();
		blogs.forEach(blog -> {
			BlogDTO blogDTO = modelMapper.map(blog, BlogDTO.class);
			blogDtos.add(blogDTO);
		});
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(blogDtos).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<APIResponse<?>> getBlog(@PathVariable("id") long id) {
		Blog blog = crudServiceForBlog.getOne(blogRepo, id);
		BlogDTO blogDto = modelMapper.map(blog, BlogDTO.class);
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(blogDto).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@PostMapping(path = "", consumes = { "multipart/form-data" })
	public ResponseEntity<APIResponse<?>> createBlog(
			@Valid @RequestPart("body") CreateBlogDTO createBlogDto,
			@RequestPart("thumbnail") MultipartFile thumbnail
	) {
		APIResponse<?> res = blogService.createBlog(thumbnail, createBlogDto);
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}
	
	@PostMapping("comment")
	public ResponseEntity<APIResponse<?>> commentOnBlog(@Valid @RequestBody CreateCommentDTO createCommentDto) {
		Blog blog = crudServiceForBlog.getOne(blogRepo, Long.parseLong(createCommentDto.getBlogId()));
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userRepo.findByEmail(email).orElse(null);
		
		Comment comment = Comment.builder()
								.content(createCommentDto.getContent())
								.blog(blog)
								.user(user)
								.build();
		var savedComment = commentRepo.save(comment);
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(201).data(savedComment).build();
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}
	
	@PostMapping("react-comment/{commentId}")
	public ResponseEntity<APIResponse<?>> reactComment(@PathVariable("commentId") long commentId,
			@RequestParam("isLike") boolean isLike
	) {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userRepo.findByEmail(email).orElse(null);
		
		Optional<ReactComment> check = reactCommentRepo.findByCommentIdAndUserId(commentId, user.getId());
		
		if(check.isEmpty()) {
			Comment comment = crudServiceForComment.getOne(commentRepo, commentId);
			ReactCommentKey id = ReactCommentKey.builder()
										.commentId(commentId)
										.userId(user.getId())
										.build();
			
			ReactComment reactComment = ReactComment.builder()
								.id(id)
								.comment(comment)
								.user(user)
								.isLike(isLike)
								.build();
			
			var savedReactComment = reactCommentRepo.save(reactComment);
			APIResponse<?> res = APIResponse.builder().status("success").statusCode(201).data(savedReactComment).build();
			return new ResponseEntity<>(res, HttpStatus.CREATED);			
		} else {
			ReactComment reactComment = check.get();
			reactComment.setLike(isLike);
			
			var savedReactComment = reactCommentRepo.save(reactComment);
			APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(savedReactComment).build();
			return new ResponseEntity<>(res, HttpStatus.CREATED);	
		}
	}
	
	@PatchMapping(path = "{id}", consumes = { "multipart/form-data" })
	public ResponseEntity<APIResponse<?>> updateBlog(@PathVariable("id") long id,
			@Valid @RequestPart(required = false, value = "body") UpdateBlogDTO updateBlogDto,
			@RequestPart(required = false, value = "thumbnail") MultipartFile thumbnail
	) {
		APIResponse<?> res = blogService.updateBlog(id, thumbnail, updateBlogDto);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@PatchMapping("comment/{id}")
	public ResponseEntity<APIResponse<?>> updateComment(@PathVariable("id") long id,
			@Valid @RequestBody UpdateCommentDTO updateCommentDto
	) {
		Comment comment = crudServiceForComment.getOne(commentRepo, id);
		comment.setContent(updateCommentDto.getContent());
		
		var savedComment = commentRepo.save(comment);
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(201).data(savedComment).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<APIResponse<?>> deleteBlog(@PathVariable("id") long id) {
		Blog blog = this.crudServiceForBlog.deleteOne(blogRepo, id);
		this.storageService.deleteFile(blog.getThumbnail());
		
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(id).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@DeleteMapping("comment/{id}")
	public ResponseEntity<APIResponse<?>> deleteComment(@PathVariable("id") long id) {
		crudServiceForComment.deleteOne(commentRepo, id);
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(null).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@DeleteMapping("react-comment/{commentId}")
	public ResponseEntity<APIResponse<?>> deleteReactComment(@PathVariable("commentId") long commentId) {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userRepo.findByEmail(email).orElse(null);
		
		Optional<ReactComment> reactComment = reactCommentRepo.findByCommentIdAndUserId(commentId, user.getId());
		if(!reactComment.isEmpty()) {
			reactCommentRepo.delete(reactComment.get());
			APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(null).build();
			return new ResponseEntity<>(res, HttpStatus.OK);			
		} else {
			throw new NotFoundException("Your reaction is not found");
		}
	}
}
