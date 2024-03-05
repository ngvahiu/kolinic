package com.ngvahiu.kolinicserver.appointment;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ngvahiu.kolinicserver.appointment.dtos.AppointmentDTO;
import com.ngvahiu.kolinicserver.appointment.dtos.CreateAppointmentDTO;
import com.ngvahiu.kolinicserver.drug.entities.DrugOrder;
import com.ngvahiu.kolinicserver.drug.entities.OrderStatus;
import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.user.User;
import com.ngvahiu.kolinicserver.user.UserRepository;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("appointments")
@RequiredArgsConstructor
public class AppointmentController {
	private final AppointmentRepository appointmentRepo;
	private final UserRepository userRepo;
	private final AppointmentService appointmentService;
	private final ModelMapper modelMapper;

	@GetMapping
	public ResponseEntity<?> getMyAppointments(@RequestParam(defaultValue = "0") int pageNo,
			@RequestParam(defaultValue = "10") int pageSize,
			@RequestParam(defaultValue = "appointmentTime") String sortBy,
			@RequestParam(defaultValue = "desc") String direc) {
		Pageable paging = PageRequest.of(pageNo, pageSize,
				Sort.by(direc.equals("asc") ? Direction.ASC : Direction.DESC, sortBy));
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userRepo.findByEmail(email).get();
		List<Appointment> appointments = appointmentRepo.findAppointmentsByUserId(user.getId(), paging);
		List<AppointmentDTO> appointmentDtos = new ArrayList<AppointmentDTO>();
		for (Appointment app : appointments) {
			AppointmentDTO appDto = modelMapper.map(app, AppointmentDTO.class);
			appointmentDtos.add(appDto);
		}
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(appointmentDtos).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@GetMapping("admin")
	public ResponseEntity<?> getAllAppointments() {
		List<Appointment> appointments = appointmentRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
		List<AppointmentDTO> appointmentDtos = new ArrayList<AppointmentDTO>();
		for (Appointment app : appointments) {
			AppointmentDTO appDto = modelMapper.map(app, AppointmentDTO.class);
			appointmentDtos.add(appDto);
		}
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(appointmentDtos).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	@PatchMapping("admin/{id}")
	public ResponseEntity<APIResponse<?>> completeAppointment(@PathVariable("id") long id) {
		Appointment app = appointmentRepo.findById(id).orElseThrow(() -> new NotFoundException("Appointment not found"));
		app.setCompleted(true);
		Appointment savedApp = appointmentRepo.save(app);
		APIResponse<Appointment> res = APIResponse.<Appointment>builder().status("success").statusCode(200).data(savedApp).build(); 
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<?> createAppointment(@Valid @RequestBody CreateAppointmentDTO createAppointmentDto)
			throws Exception {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		APIResponse<?> res = appointmentService.createAppointment(email, createAppointmentDto);
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<APIResponse<?>> deleteAppointment(@PathVariable("id") long id) {
		appointmentRepo.deleteById(id);
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(id).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
}
