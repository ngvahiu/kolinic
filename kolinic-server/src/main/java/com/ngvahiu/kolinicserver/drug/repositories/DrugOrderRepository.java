package com.ngvahiu.kolinicserver.drug.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ngvahiu.kolinicserver.drug.entities.DrugOrder;

public interface DrugOrderRepository extends JpaRepository<DrugOrder, Long> {
	List<DrugOrder> findAllDrugsOrderByUserId(long id); 
}
