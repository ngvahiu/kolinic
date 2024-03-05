package com.ngvahiu.kolinicserver.auth.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddPasswordDTO {
	@Size(min = 8, message = "Password must have at least 8 characters.")
	@Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",
     message = "Password must contain at least 1 uppercase, 1 lowercase, and 1 digit ")
	private String password;
	
	@NotBlank(message = "Password confirm should not be NULL or empty")
	private String passwordConfirm;
	
	public boolean isPasswordsMatched() {
		return this.password.equals(this.passwordConfirm);
	}
}
