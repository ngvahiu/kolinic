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
public class SocialAuthenticateDTO {
	@NotBlank(message = "Email should not be NULL or empty")
	@Email(message = "Email must be in valid form")
	private String email;
	@NotBlank(message = "Name should not be NULL or empty")
	private String fullName;
	private String avatar;
}
