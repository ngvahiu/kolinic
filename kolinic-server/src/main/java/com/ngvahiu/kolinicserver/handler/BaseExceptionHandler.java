package com.ngvahiu.kolinicserver.handler;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ngvahiu.kolinicserver.exception.BadRequestException;
import com.ngvahiu.kolinicserver.exception.ForbiddenException;
import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;

@RestControllerAdvice
public class BaseExceptionHandler {
	@ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public APIResponse<?> handleMethodArgumentException(MethodArgumentNotValidException exception) {
        APIResponse<?> res = new APIResponse<>();
        List<String> errors = new ArrayList<>();
        exception.getBindingResult().getFieldErrors()
                .forEach(error -> {
                    errors.add(error.getDefaultMessage());
                });
        res.setStatus("failed");
        res.setErrors(errors);
        res.setStatusCode(400);
        return res;
    }
	
	@ExceptionHandler(BadRequestException.class)
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public APIResponse<?> handleBadRequestException(BadRequestException exception) {
        APIResponse<?> res = new APIResponse<>();
        res.setStatus("failed");
        res.setErrors(Collections.singletonList(exception.getMessage()));
        res.setStatusCode(400);
        return res;
    }
	
	@ExceptionHandler(NotFoundException.class)
	@ResponseStatus(code = HttpStatus.NOT_FOUND)
	public APIResponse<?> handleNotFoundException(NotFoundException exception) {
        APIResponse<?> res = new APIResponse<>();
        res.setStatus("failed");
        res.setErrors(Collections.singletonList(exception.getMessage()));
        res.setStatusCode(404);
        return res;
    }
	
	@ExceptionHandler(ForbiddenException.class)
	@ResponseStatus(code = HttpStatus.FORBIDDEN)
	public APIResponse<?> handleForbiddenException(ForbiddenException exception) {
        APIResponse<?> res = new APIResponse<>();
        res.setStatus("failed");
        res.setErrors(Collections.singletonList(exception.getMessage()));
        res.setStatusCode(403);
        return res;
    }
}
