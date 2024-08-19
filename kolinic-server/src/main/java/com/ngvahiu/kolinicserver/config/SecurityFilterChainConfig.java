package com.ngvahiu.kolinicserver.config;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import com.ngvahiu.kolinicserver.user.Role;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityFilterChainConfig {
	private final JwtAuthenticationFilter jwtAuthFilter;
	private final AuthenticationProvider authProvider;
	private final LogoutHandler logoutHandler;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable)
					.authorizeHttpRequests(
							(authz) -> {
								authz.requestMatchers(HttpMethod.GET, "/error", "/email/*", "/css/*", "/img/*").permitAll();
								authz.requestMatchers(HttpMethod.PATCH, "/auth/reset-password/*").permitAll();
								authz.requestMatchers(HttpMethod.POST, "/auth/*", "/auth/*/*").permitAll();
								authz.requestMatchers("/email/**").permitAll();
								authz.requestMatchers("/payment/*", "/payment/**").permitAll();
								authz.requestMatchers("/users/me").hasAnyAuthority(Role.ADMIN.name(), Role.USER.name());
								authz.requestMatchers("/users", "/users/*", "/users/activate/*").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.GET, "/services", "/services/*").permitAll();
								authz.requestMatchers(HttpMethod.POST, "/services").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.PATCH, "/services/*").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.DELETE, "/services/*").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.GET, "/departments", "/departments/*").permitAll();
								authz.requestMatchers(HttpMethod.POST, "/departments").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.PATCH, "/departments/*").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.DELETE, "/departments/*").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.GET, "/doctors", "/doctors/*").permitAll();
								authz.requestMatchers(HttpMethod.POST, "/doctors").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.PATCH, "/doctors/*").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.DELETE, "/doctors/*").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.GET, "/drug-categories", "/drug-categories/*").permitAll();
								authz.requestMatchers(HttpMethod.POST, "/drug-categories").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.PATCH, "/drug-categories/*").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.DELETE, "/drug-categories/*").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.GET, "/drugs/order").authenticated();
								authz.requestMatchers(HttpMethod.GET, "/drugs/order/admin").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.GET, "/drugs", "/drugs/*", "/drugs/*/*").permitAll();
								authz.requestMatchers(HttpMethod.POST, "/drugs").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.PATCH, "/drugs/*").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.DELETE, "/drugs/*").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.GET, "/blogs", "/blogs/*", "/blogs/*/*").permitAll();
								authz.requestMatchers(HttpMethod.POST, "/blogs").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.PATCH, "/blogs/*").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers(HttpMethod.DELETE, "/blogs/*").hasAnyAuthority(Role.ADMIN.name());
								authz.requestMatchers("/appointments/admin", "/appointments/admin/*").hasAnyAuthority(Role.ADMIN.name());
								authz.anyRequest().authenticated();
							}
					)
					.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
					.authenticationProvider(authProvider)
					.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
					.logout((logout) -> logout.logoutUrl("/auth/logout").addLogoutHandler(logoutHandler)
										.logoutSuccessHandler((req, res, auth) -> SecurityContextHolder.clearContext())
					)
					.exceptionHandling(exception -> exception
							.accessDeniedHandler(new CustomAccessDeniedHandler())
							.authenticationEntryPoint(new CustomAuthenticationEntryPoint())
					);
		
		return http.build();
	}
}

@Component
class CustomAccessDeniedHandler implements AccessDeniedHandler {
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

		String jsonResponse = String.format(
			"{\"status\": \"failed\", \"errors\": [\"Forbidden\"], \"statusCode\": 403}"
		);

		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		response.getWriter().print(jsonResponse);
		response.getWriter().flush();
	}
}

@Component
class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

		String jsonResponse = String.format(
				"{\"status\": \"failed\", \"errors\": [\"%s\"], \"statusCode\": 401}", request.getAttribute("errorMessage"));

		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.getWriter().print(jsonResponse);
		response.getWriter().flush();
	}
}