package com.ngvahiu.kolinicserver.drug.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DrugOrderItemKey implements Serializable {
	@Column(name = "order_id")
    long orderId;

    @Column(name = "drug_id")
    long drugId;
}
