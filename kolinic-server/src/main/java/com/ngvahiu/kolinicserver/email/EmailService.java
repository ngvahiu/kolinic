package com.ngvahiu.kolinicserver.email;

import java.io.UnsupportedEncodingException;

import org.springframework.ui.Model;

import com.ngvahiu.kolinicserver.user.User;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;

public interface EmailService {
	void sendEmailVerification(User user, HttpServletRequest request) throws UnsupportedEncodingException, MessagingException;
	void sendEmailResetPassword(String email, String resetToken) throws UnsupportedEncodingException, MessagingException;
	void verifyEmail(String token, Model model, HttpServletRequest request);
	void resendVerification(String email, Model model, HttpServletRequest request) throws UnsupportedEncodingException, MessagingException;
}
