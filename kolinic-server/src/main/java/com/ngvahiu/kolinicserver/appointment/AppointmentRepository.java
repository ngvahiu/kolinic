package com.ngvahiu.kolinicserver.appointment;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	List<Appointment> findAppointmentsByUserId(long id, Pageable paging);
	Optional<Appointment> findAppointmentByDoctorIdAndAppointmentTime(long id, Date appointmentTime);
}
