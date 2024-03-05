package com.ngvahiu.kolinicserver.drug.dtos;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateOrderDTO {
	@NotBlank(message = "Receiver's name should not be NULL or empty")
	private String receiverName;
	@NotBlank(message = "Contact number should not be NULL or empty")
	private String contactNumber;
	@NotBlank(message = "Address should not be NULL or empty")
	private String address;
	@NotBlank(message = "Email should not be NULL or empty")
	private String email;
	@NotBlank(message = "Payment method should not be NULL or empty")
	private String paymentMethod;
	@NotBlank(message = "List of items should not be NULL or empty")
	private List<OrderItemDTO> listItems;
}	
