package com.ngvahiu.kolinicserver.drug.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ngvahiu.kolinicserver.drug.entities.DrugCategory;

public interface DrugCategoryRepository extends JpaRepository<DrugCategory, Long> {

}
