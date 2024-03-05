package com.ngvahiu.kolinicserver.email;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.user.User;
import com.ngvahiu.kolinicserver.user.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
	private final JavaMailSender mailSender;
	private final UserRepository userRepo;
	@Value("${spring.mail.from}")
	private String emailFrom;

	@Override
	public void sendEmailVerification(User user, HttpServletRequest request)
			throws UnsupportedEncodingException, MessagingException {
		String verificationToken = UUID.randomUUID().toString();
		user.setVerifyToken(verificationToken);
		user.setVerifyTokenExpires(LocalDateTime.now().plusMinutes(5));
		User savedUser = userRepo.save(user);
		String url = "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
				+ "/email/verify/" + verificationToken;

		String subject = "Kolinic: Email Verification";
		String senderName = "Kolinic's user Service";
		String mailContent = "<p> Hi, " + savedUser.getFullName() + " </p>" + "<p>Thank you for registering with Kolinic's services. "
				+ "Please, following the link below to complete your registration.</p>" + "<a href=\"" + url
				+ "\">Verify your email to activate your account</a>"
				+ "<p> Thank you, <br> Kolinic's user Service <br>"
				+ "<hr><img src=\"cid:logoImage\" />";
		MimeMessage message = mailSender.createMimeMessage();
		var messageHelper = new MimeMessageHelper(message, true);
		messageHelper.setFrom(emailFrom, senderName);
		messageHelper.setTo(savedUser.getEmail());
		messageHelper.setSubject(subject);
		messageHelper.setText(mailContent, true);
		
		ClassPathResource resource = new ClassPathResource("static/img/logo.jpg");
		messageHelper.addInline("logoImage", resource);
		
		mailSender.send(message);
	}
	
	@Override
	public void sendEmailResetPassword(String email, String resetToken)
			throws UnsupportedEncodingException, MessagingException {
		String url = "http://kolinic-client.s3-website-ap-southeast-1.amazonaws.com/reset-password/" + resetToken;
		String subject = "Kolinic: Reset password ";
		String senderName = "Kolinic's user Service";
		String mailContent = "<h3>You have requested to reset your password</h3> <p> We cannot simply send you your old password. A unique link to reset your "
				+ "password has been generated for you. To reset your password, click the "
				+ "following link and follow the instructions. </p>"
				+ "<a href=\"" + url + "\" target=\"_blank\">Reset password</a> <br>"
				+ "<hr><img src=\"cid:logoImage\" />";
		MimeMessage message = mailSender.createMimeMessage();
		var messageHelper = new MimeMessageHelper(message, true);
		messageHelper.setFrom(emailFrom, senderName);
		messageHelper.setTo(email);
		messageHelper.setSubject(subject);
		messageHelper.setText(mailContent, true);
		
		ClassPathResource resource = new ClassPathResource("static/img/logo.jpg");
		messageHelper.addInline("logoImage", resource);
		
		mailSender.send(message);
	}
	
	@Override
	public void verifyEmail(String token, Model model, HttpServletRequest request) {
		User user = userRepo.findByVerifyToken(token).orElse(null);
		if (user != null) {
			if (LocalDateTime.now().isBefore(user.getVerifyTokenExpires())) {
				user.setVerifyToken(null);
				user.setVerifyTokenExpires(null);
				user.setActive(true);
				userRepo.save(user);
				model.addAttribute("notify", "Email verified successfully");
			} else {
				model.addAttribute("notify",
						"Your verification is expired. Please click below if you want us to re-send verification email");
				String url = "http://" + request.getServerName() + ":" + request.getServerPort()
						+ request.getContextPath() + "/email/resend-verification?email=" + user.getEmail();
				model.addAttribute("resendUrl", url);
				model.addAttribute("resendText", "Re-send verification email");
			}
		} else {
			model.addAttribute("notify", "Verification token is invalid");
		}
	}

	@Override
	public void resendVerification(String email, Model model, HttpServletRequest request) throws UnsupportedEncodingException, MessagingException {
		User user = userRepo.findByEmail(email).orElse(null);
		if(user != null) {
			this.sendEmailVerification(user, request);
		} else {
			throw new NotFoundException("Email not found");
		}
	}
}
