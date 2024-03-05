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
public class UpdatePasswordDTO {
	@NotBlank(message = "Current password should not be NULL or empty")
	private String currentPassword;
	
	@Size(min = 8, message = "New password must have at least 8 characters.")
	@Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",
     message = "Password must contain at least 1 uppercase, 1 lowercase, and 1 digit ")
	private String newPassword;
	
	@NotBlank(message = "New password confirm should not be NULL or empty")
	private String newPasswordConfirm;
	
	public boolean isNewPasswordsMatched() {
		return this.newPassword.equals(this.newPasswordConfirm);
	}
}
