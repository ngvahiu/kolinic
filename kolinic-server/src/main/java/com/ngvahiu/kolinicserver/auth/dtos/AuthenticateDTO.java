package com.ngvahiu.kolinicserver.auth.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AuthenticateDTO {
	@NotBlank(message = "Email should not be NULL or empty")
	@Email(message = "Email must be in valid form")
	private String email;
	
	@NotBlank(message = "Password should not be NULL or empty")
	private String password;
}
