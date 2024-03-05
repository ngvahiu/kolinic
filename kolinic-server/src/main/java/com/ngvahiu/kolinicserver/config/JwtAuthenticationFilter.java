package com.ngvahiu.kolinicserver.config;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ngvahiu.kolinicserver.token.LogoutTokenRepository;
import com.ngvahiu.kolinicserver.user.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	private final JwtService jwtService;
	private final UserDetailsService userDetailsService;
	private final LogoutTokenRepository logoutTokenRepo;
	private final UserRepository userRepo;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		final String authHeader = request.getHeader("Authorization");
		final String jwt;
		final String userEmail;

		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			request.setAttribute("errorMessage", "Invalid access token");
			filterChain.doFilter(request, response);
			return;
		}

		jwt = authHeader.substring(7);
		userEmail = jwtService.extractUsername(jwt);
		if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
			var checkToken = logoutTokenRepo.findByToken(jwt).orElse(null); // check if the token is logged out
			if(checkToken != null) {
				request.setAttribute("errorMessage", "Your access token is already logged out");
				filterChain.doFilter(request, response);
				return;
			}
			if (!jwtService.isTokenValid(jwt, userDetails)) {
				request.setAttribute("errorMessage", "Invalid token");
				filterChain.doFilter(request, response);
				return;
			}
			if (jwtService.isTokenExpired(jwt)) {
				request.setAttribute("errorMessage", "Expired token");
				filterChain.doFilter(request, response);
				return;
			}
			// check if the account is active
			var user = userRepo.findByEmail(userEmail).orElse(null);
			if(!user.isActive()) {
				request.setAttribute("errorMessage", "Your account is inactive");
				filterChain.doFilter(request, response);
				return;
			}
			// check if the iat of token is before the change_password timestamp
			if(user.getChangePasswordAt() != null && user.getChangePasswordAt().after(jwtService.extractIssuedAt(jwt))) {
				request.setAttribute("errorMessage", "Your password was already changed. Please log in again to access this route");
				filterChain.doFilter(request, response);
				return;
			}
			UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
					null, userDetails.getAuthorities());
			authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(authToken);	
		}
		filterChain.doFilter(request, response);
	}
}
