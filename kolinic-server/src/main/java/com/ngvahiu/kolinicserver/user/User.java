package com.ngvahiu.kolinicserver.user;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ngvahiu.kolinicserver.appointment.Appointment;
import com.ngvahiu.kolinicserver.blog.entities.Comment;
import com.ngvahiu.kolinicserver.blog.entities.ReactComment;
import com.ngvahiu.kolinicserver.drug.entities.DrugOrder;
import com.ngvahiu.kolinicserver.feedback.Feedback;
import com.ngvahiu.kolinicserver.token.LogoutToken;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user", uniqueConstraints = {
		@UniqueConstraint(name = "UniqueEmailAndProvider", columnNames = { "email", "provider" }) })
public class User implements UserDetails, Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false)
	private String fullName;

	private String phoneNumber;

	private String password;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	@Builder.Default
	private Gender gender = Gender.MALE;

	private Date dob;

	private String address;

	private String passwordConfirm;
	private String avatar;

	@Column(columnDefinition = "BOOLEAN default FALSE")
	private boolean active;

	private Date changePasswordAt;
	private String passwordResetToken;
	private LocalDateTime passwordResetExpires;
	private String verifyToken;
	private LocalDateTime verifyTokenExpires;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	@Builder.Default
	private Role role = Role.USER;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<LogoutToken> tokens;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Feedback> feedbacks;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Appointment> appointments;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<DrugOrder> drugOrders;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Comment> comments;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<ReactComment> reactComments;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(this.role.getName()));
		return authorities;
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
