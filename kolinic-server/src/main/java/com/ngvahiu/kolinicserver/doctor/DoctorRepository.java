package com.ngvahiu.kolinicserver.doctor;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
	List<Doctor> findByNameContaining(String search);
}
