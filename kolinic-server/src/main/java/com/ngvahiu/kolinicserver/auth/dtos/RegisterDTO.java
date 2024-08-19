package com.ngvahiu.kolinicserver.auth.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RegisterDTO {
	@NotBlank(message = "Email should not be NULL or empty")
	@Email(message = "Email must be in valid form")
	private String email;

	@NotBlank(message = "Name should not be NULL or empty")
	private String fullName;

	@NotBlank(message = "Phone number should not be NULL or empty")
	@Pattern(regexp = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$", message = "Phone number must be in valid form")
	private String phoneNumber;

	@NotBlank(message = "Password should not be NULL or empty")
	@Size(min = 8, message = "Password must have at least 8 characters.")
	@Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$", 
		message = "Password must contain at least 1 uppercase, 1 lowercase, and 1 digit")
	private String password;

	@NotBlank(message = "Password confirmation should not be NULL or empty")
	private String passwordConfirm;
	
	@NotBlank(message = "Gender should not be NULL or empty")
	private String gender;

	public boolean isPasswordsMatched() {
		return this.password.equals(this.passwordConfirm);
	}
}
