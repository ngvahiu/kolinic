package com.ngvahiu.kolinicserver.user;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
	private long id;
	private String email;
	private String fullName;
	private String phoneNumber;
	private Gender gender;
	private Date dob;
	private String address;
	private String avatar;
	private boolean active;
	private Role role;
	private boolean hasPassword;
}
