package com.ngvahiu.kolinicserver.auth.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SocialAuthenticateDTO {
	@NotBlank(message = "Email should not be NULL or empty")
	@Email
	private String email;
	@NotBlank(message = "Name should not be NULL or empty")
	private String fullName;
	private String avatar;
}
