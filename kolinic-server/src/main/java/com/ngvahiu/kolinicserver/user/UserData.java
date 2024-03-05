package com.ngvahiu.kolinicserver.user;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserData {
	private String fullName;
	private String email;
	private String phoneNumber;
	private String role;
	private boolean active;
	private String password;
	private String gender;
	private String address;
	private String dob;
}