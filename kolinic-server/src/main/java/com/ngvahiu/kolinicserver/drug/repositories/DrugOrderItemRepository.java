package com.ngvahiu.kolinicserver.drug.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ngvahiu.kolinicserver.drug.entities.DrugOrderItem;

public interface DrugOrderItemRepository extends JpaRepository<DrugOrderItem, Long> {

}
