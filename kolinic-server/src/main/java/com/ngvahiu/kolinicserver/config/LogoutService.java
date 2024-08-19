package com.ngvahiu.kolinicserver.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import com.ngvahiu.kolinicserver.token.LogoutToken;
import com.ngvahiu.kolinicserver.token.LogoutTokenRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
	private final LogoutTokenRepository logoutTokenRepo;

	@Override
	public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
		final String authHeader = request.getHeader("Authorization");
		final String jwt;
		
		if(authHeader == null || !authHeader.startsWith("Bearer ")) {
			throw new RuntimeException("Unauthorized. JWT Token is missing");
		}
		
		jwt = authHeader.substring(7);
		if(jwt != null) {
			LogoutToken token = LogoutToken.builder().token(jwt).build();
			logoutTokenRepo.save(token);
			SecurityContextHolder.clearContext();
		}
	}	
}
