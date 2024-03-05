package com.ngvahiu.kolinicserver.exception;

public class BadRequestException extends RuntimeException {
	public BadRequestException(String message) {
        super(message);
    }
}
