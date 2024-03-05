package com.ngvahiu.kolinicserver.drug.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ngvahiu.kolinicserver.drug.entities.Drug;

public interface DrugRepository extends JpaRepository<Drug, Long> {
	List<Drug> findAllByCategoryId(Pageable paging, long categoryId);
	List<Drug> findByNameContaining(String search);
}
