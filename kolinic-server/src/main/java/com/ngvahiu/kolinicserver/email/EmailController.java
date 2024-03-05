package com.ngvahiu.kolinicserver.email;

import java.io.UnsupportedEncodingException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("email")
@RequiredArgsConstructor
public class EmailController {
	private final EmailService emailService;

	@GetMapping("verify/{token}")
	public String verifyEmail(@PathVariable("token") String token, Model model, HttpServletRequest request) {
		emailService.verifyEmail(token, model, request);
		return "verifyEmail";
	}
	
	@GetMapping("resend-verification")
	public String resendVerification(@RequestParam("email") String email, Model model, HttpServletRequest request) throws UnsupportedEncodingException, MessagingException{
		emailService.resendVerification(email, model, request);
		return "resendVerification";
	}
}
