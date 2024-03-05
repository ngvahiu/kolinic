package com.ngvahiu.kolinicserver.token;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogoutTokenRepository extends JpaRepository<LogoutToken, Long> {
	Optional<LogoutToken> findByToken(String token);
}
