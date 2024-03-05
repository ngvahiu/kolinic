package com.ngvahiu.kolinicserver.drug.controllers;

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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.drug.dtos.CreateDrugDTO;
import com.ngvahiu.kolinicserver.drug.dtos.CreateOrderDTO;
import com.ngvahiu.kolinicserver.drug.dtos.DrugDTO;
import com.ngvahiu.kolinicserver.drug.dtos.UpdateDrugDTO;
import com.ngvahiu.kolinicserver.drug.entities.Drug;
import com.ngvahiu.kolinicserver.drug.entities.DrugOrder;
import com.ngvahiu.kolinicserver.drug.entities.OrderStatus;
import com.ngvahiu.kolinicserver.drug.repositories.DrugOrderRepository;
import com.ngvahiu.kolinicserver.drug.repositories.DrugRepository;
import com.ngvahiu.kolinicserver.drug.services.DrugService;
import com.ngvahiu.kolinicserver.exception.ForbiddenException;
import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.handler.CrudHandlerFactory;
import com.ngvahiu.kolinicserver.storage.StorageService;
import com.ngvahiu.kolinicserver.user.Role;
import com.ngvahiu.kolinicserver.user.User;
import com.ngvahiu.kolinicserver.user.UserRepository;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("drugs")
@RequiredArgsConstructor
public class DrugController {
	private final CrudHandlerFactory<Drug> crudService;
	private final StorageService storageService;
	private final DrugService drugService;
	private final DrugRepository drugRepo;
	private final DrugOrderRepository drugOrderRepo;
	private final UserRepository userRepo;
	private final ModelMapper modelMapper;

	@GetMapping
	public ResponseEntity<?> getAllDrugs(@RequestParam(defaultValue = "0") int pageNo,
			@RequestParam(defaultValue = "-1") int pageSize, @RequestParam(defaultValue = "id") String sortBy,
			@RequestParam(defaultValue = "asc") String direc, @RequestParam(defaultValue = "") String search) {
		List<Drug> drugs = new ArrayList<Drug>();
		if (pageSize == -1) {
			drugs = drugRepo.findByNameContaining(search);
		} else {
			drugs = crudService.getAll(drugRepo, pageNo, pageSize, sortBy, direc);
		}

		List<DrugDTO> drugDtos = new ArrayList<DrugDTO>();
		drugs.forEach(drug -> {
			DrugDTO drugDto = modelMapper.map(drug, DrugDTO.class);
			drugDtos.add(drugDto);
		});
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(drugDtos).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@GetMapping("by-category/{id}")
	public ResponseEntity<?> getAllDrugsByCategory(@RequestParam(defaultValue = "0") int pageNo,
			@RequestParam(defaultValue = "10") int pageSize, @RequestParam(defaultValue = "id") String sortBy,
			@RequestParam(defaultValue = "asc") String direc, @PathVariable("id") long id) {
		Pageable paging = PageRequest.of(pageNo, pageSize,
				Sort.by(direc.equals("asc") ? Direction.ASC : Direction.DESC, sortBy));
		List<Drug> drugs = drugRepo.findAllByCategoryId(paging, id);
		List<DrugDTO> drugDtos = new ArrayList<DrugDTO>();
		drugs.forEach(drug -> {
			DrugDTO drugDto = modelMapper.map(drug, DrugDTO.class);
			drugDtos.add(drugDto);
		});
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(drugDtos).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@GetMapping("order")
	public ResponseEntity<APIResponse<?>> getDrugOrders() {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userRepo.findByEmail(email).get();
		List<DrugOrder> drugOrders = drugOrderRepo.findAllDrugsOrderByUserId(user.getId());
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(drugOrders).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@GetMapping("order/admin")
	public ResponseEntity<APIResponse<?>> getAllDrugOrders() {
		List<DrugOrder> drugOrders = drugOrderRepo.findAll(Sort.by(Sort.Direction.DESC, "orderDate"));
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(drugOrders).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@GetMapping("{id}")
	public ResponseEntity<APIResponse<?>> getDrug(@PathVariable("id") long id) {
		Drug drug = crudService.getOne(drugRepo, id);
		DrugDTO drugDto = modelMapper.map(drug, DrugDTO.class);
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(drugDto).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PostMapping(path = "", consumes = { "multipart/form-data" })
	public ResponseEntity<APIResponse<?>> createDrug(@Valid @RequestPart("body") CreateDrugDTO createDrugDto,
			@RequestPart("img") MultipartFile img) {
		APIResponse<?> res = drugService.createDrug(img, createDrugDto);
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}

	@PostMapping(path = "order")
	public ResponseEntity<APIResponse<?>> createOrder(@RequestBody CreateOrderDTO createOrderDto) {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		APIResponse<?> res = drugService.createOrder(email, createOrderDto);
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}

	@PatchMapping(path = "{id}", consumes = { "multipart/form-data" })
	public ResponseEntity<APIResponse<?>> updateDrug(@PathVariable("id") long id,
			@Valid @RequestPart(required = false, value = "body") UpdateDrugDTO updateDrugDto,
			@RequestPart(required = false, value = "img") MultipartFile img) throws Exception {
		APIResponse<?> res = drugService.updateDrug(id, img, updateDrugDto);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PatchMapping("order/{id}")
	public ResponseEntity<APIResponse<?>> updateOrderStatus(@PathVariable("id") long id,
			@RequestParam("status") String status) throws Exception {
		DrugOrder order = drugOrderRepo.findById(id).orElseThrow(() -> new NotFoundException("Order not found"));
		order.setOrderStatus(OrderStatus.valueOf(status));

		DrugOrder savedOrder = drugOrderRepo.save(order);
		APIResponse<DrugOrder> res = APIResponse.<DrugOrder>builder().status("success").statusCode(200).data(savedOrder)
				.build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@DeleteMapping("{id}")
	public ResponseEntity<APIResponse<?>> deleteDrug(@PathVariable("id") long id) {
		Drug drug = this.crudService.deleteOne(drugRepo, id);
		this.storageService.deleteFile(drug.getImg());
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(id).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@DeleteMapping("order/{id}")
	public ResponseEntity<APIResponse<?>> cancelDrugOrder(@PathVariable("id") long id) {
		DrugOrder drugOrder = drugOrderRepo.findById(id)
				.orElseThrow(() -> new NotFoundException("Drug order not found"));
		if (!drugOrder.getUser().getEmail()
				.equalsIgnoreCase(SecurityContextHolder.getContext().getAuthentication().getName())
			&& 
			userRepo.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).get().getRole() != Role.ADMIN
		) {
			throw new ForbiddenException("You are not allowed to cancel this order");
		}
		drugOrder.getDrugOrderItems().forEach(item -> {
			var drug = drugRepo.findById(item.getDrug().getId()).orElse(null);
			if(drug != null) {
				drug.setRemaining(drug.getRemaining() + item.getQuantity());
				drugRepo.save(drug);
			}
		});
		drugOrderRepo.deleteById(id);
		APIResponse<?> res = APIResponse.builder().status("success").statusCode(200).data(id).build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
}
