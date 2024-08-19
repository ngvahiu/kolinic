package com.ngvahiu.kolinicserver.drug.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ngvahiu.kolinicserver.drug.dtos.CreateDrugDTO;
import com.ngvahiu.kolinicserver.drug.dtos.CreateOrderDTO;
import com.ngvahiu.kolinicserver.drug.dtos.DrugDTO;
import com.ngvahiu.kolinicserver.drug.dtos.OrderItemDTO;
import com.ngvahiu.kolinicserver.drug.dtos.UpdateDrugDTO;
import com.ngvahiu.kolinicserver.drug.entities.Drug;
import com.ngvahiu.kolinicserver.drug.entities.DrugOrder;
import com.ngvahiu.kolinicserver.drug.entities.DrugOrderItem;
import com.ngvahiu.kolinicserver.drug.entities.DrugOrderItemKey;
import com.ngvahiu.kolinicserver.drug.entities.OrderStatus;
import com.ngvahiu.kolinicserver.drug.entities.PaymentMethod;
import com.ngvahiu.kolinicserver.drug.repositories.DrugCategoryRepository;
import com.ngvahiu.kolinicserver.drug.repositories.DrugOrderItemRepository;
import com.ngvahiu.kolinicserver.drug.repositories.DrugOrderRepository;
import com.ngvahiu.kolinicserver.drug.repositories.DrugRepository;
import com.ngvahiu.kolinicserver.exception.BadRequestException;
import com.ngvahiu.kolinicserver.exception.NotFoundException;
import com.ngvahiu.kolinicserver.storage.StorageService;
import com.ngvahiu.kolinicserver.user.User;
import com.ngvahiu.kolinicserver.user.UserRepository;
import com.ngvahiu.kolinicserver.utils.APIResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DrugServiceImpl implements DrugService {
	private final DrugRepository drugRepo;
	private final DrugCategoryRepository drugCategoryRepo;
	private final DrugOrderRepository drugOrderRepo;
	private final DrugOrderItemRepository drugOrderItemRepo;
	private final UserRepository userRepo;
	private final StorageService storageService;
	private final ModelMapper modelMapper;

	@Override
	@Transactional
	public APIResponse<?> createDrug(MultipartFile img, @Valid CreateDrugDTO createDrugDto) {
		try {
			String imgUrl = storageService.uploadFile(img, "drugs");
			var category = drugCategoryRepo.findById(Long.parseLong(createDrugDto.getCategoryId()))
					.orElseThrow(() -> new NotFoundException("Category ID not found"));
			Drug drug = Drug.builder().name(createDrugDto.getName()).description(createDrugDto.getDescription())
					.packSize(Integer.parseInt(createDrugDto.getPackSize()))
					.price(Double.parseDouble(createDrugDto.getPrice()))
					.remaining(Integer.parseInt(createDrugDto.getRemaining())).img(imgUrl).category(category).build();

			var savedDrug = drugRepo.save(drug);
			DrugDTO drugDto = modelMapper.map(savedDrug, DrugDTO.class);
			return APIResponse.builder().status("success").statusCode(201).data(drugDto).build();
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	@Transactional
	public APIResponse<?> updateDrug(long id, MultipartFile img, @Valid UpdateDrugDTO updateDrugDto) {
		try {
			var drug = drugRepo.findById(id).orElseThrow(() -> new NotFoundException("Drug not found with id: " + id));

			if (updateDrugDto.getName() != null)
				drug.setName(updateDrugDto.getName());
			if (updateDrugDto.getDescription() != null)
				drug.setDescription(updateDrugDto.getDescription());
			if (updateDrugDto.getPackSize() != null)
				drug.setPackSize(Integer.parseInt(updateDrugDto.getPackSize()));
			if (updateDrugDto.getPrice() != null)
				drug.setPrice(Double.parseDouble(updateDrugDto.getPrice()));
			if (updateDrugDto.getRemaining() != null)
				drug.setRemaining(Integer.parseInt(updateDrugDto.getRemaining()));
			if (updateDrugDto.getCategoryId() != null) {
				var category = drugCategoryRepo.findById(Long.parseLong(updateDrugDto.getCategoryId()))
						.orElseThrow(() -> new NotFoundException("Category ID not found"));
				drug.setCategory(category);
			}

			if (img != null) {
				if (drug.getImg() != null || drug.getImg() != "") {
					storageService.deleteFile(drug.getImg());
				}
				String imgUrl = storageService.uploadFile(img, "drugs");
				drug.setImg(imgUrl);
			}
			var savedDrug = drugRepo.save(drug);
			DrugDTO drugDto = modelMapper.map(savedDrug, DrugDTO.class);
			return APIResponse.builder().status("success").statusCode(200).data(drugDto).build();
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	@Transactional
	public APIResponse<?> createOrder(String email, CreateOrderDTO createOrderDto) {
		try {
			// create DrugOrder record
			User user = userRepo.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));
			DrugOrder drugOrder = DrugOrder.builder().receiverName(createOrderDto.getReceiverName())
					.contactNumber(createOrderDto.getContactNumber()).address(createOrderDto.getAddress())
					.email(createOrderDto.getEmail()).orderDate(new Date()).orderStatus(OrderStatus.CONFIRMING)
					.paymentMethod(PaymentMethod.valueOf(createOrderDto.getPaymentMethod()))
					.user(user).build();
			DrugOrder savedDrugOrder = drugOrderRepo.save(drugOrder);
			
			// create DrugOrderItem record
			List<OrderItemDTO> orderItemDtos = createOrderDto.getListItems();
			List<DrugOrderItem> listItems = new ArrayList<DrugOrderItem>();
			for (OrderItemDTO orderItemDto : orderItemDtos) {
				DrugOrderItemKey itemKey = new DrugOrderItemKey(savedDrugOrder.getId(), Long.parseLong(orderItemDto.getDrugId()));
				Drug drug = drugRepo.findById(Long.parseLong(orderItemDto.getDrugId()))
										.orElseThrow(() -> new NotFoundException("Drug not found with ID: " + orderItemDto.getDrugId()));
				
				if(drug.getRemaining() < Integer.parseInt(orderItemDto.getQuantity())) {
					throw new BadRequestException("Drug " + drug.getName() + "'s remaining is only " + drug.getRemaining() + " left");
				}
				DrugOrderItem item = DrugOrderItem.builder()
										.id(itemKey)
										.drug(drug)
										.order(savedDrugOrder)
										.quantity(Integer.parseInt(orderItemDto.getQuantity()))
										.build();
				
				drug.setRemaining(drug.getRemaining() - Integer.parseInt(orderItemDto.getQuantity()));
				DrugOrderItem savedItem = drugOrderItemRepo.save(item);
				listItems.add(savedItem);
			}
			
			savedDrugOrder.setDrugOrderItems(listItems);
			DrugOrder res = drugOrderRepo.save(savedDrugOrder);
			return APIResponse.builder().status("success").statusCode(200).data(res).build();
		} catch (Exception e) {
			throw e;
		}
	}
}
