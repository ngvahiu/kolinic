package com.ngvahiu.kolinicserver.user.dtos;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateMeDTO {
	private String fullName;
	
	@Pattern(regexp = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$", message = "Phone number must be in valid form")
	private String phoneNumber;
	
	private String gender;
	
	private String address;
	
	@Pattern(regexp = "[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])", message = "Date should be in form yyyy-mm-dd")
	private String dob;
}
