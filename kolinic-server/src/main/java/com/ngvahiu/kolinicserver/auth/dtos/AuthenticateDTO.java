package com.ngvahiu.kolinicserver.auth.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthenticateDTO {
	@NotBlank(message = "Email should not be NULL or empty")
	@Email
	private String email;
	
	@NotBlank(message = "Password should not be NULL or empty")
	private String password;
}
