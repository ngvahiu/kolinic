package com.ngvahiu.kolinicserver.user;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
	Optional<User> findByVerifyToken(String verifyToken);
	Optional<User> findByPasswordResetToken(String verifyToken);
	@Query("select u from User u where u.fullName like %:search% or u.email like %:search% order by 'id'")
	List<User> findAllUsersContaining(@Param("search") String search);
}
