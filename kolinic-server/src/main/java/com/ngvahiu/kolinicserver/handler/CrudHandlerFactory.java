package com.ngvahiu.kolinicserver.handler;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.ngvahiu.kolinicserver.exception.NotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Transactional(readOnly = true)
public class CrudHandlerFactory<T> {
	@Transactional
	public T deleteOne(JpaRepository<T, Long> modelRepo, long id) {
		T doc = modelRepo.findById(id).orElseThrow(() -> new NotFoundException("No document found with id: " + id));
		modelRepo.deleteById(id);
		return doc;
	}
	
	public T getOne(JpaRepository<T, Long> modelRepo, long id) {
		T doc = modelRepo.findById(id).orElseThrow(() -> new NotFoundException("No document found with id: " + id));
		return doc;
	}

	@Transactional
	public T updateOne(JpaRepository<T, Long> modelRepo, T body) {
		T doc = modelRepo.save(body);
		return doc;
	}

	@Transactional
	public T createOne(JpaRepository<T, Long> modelRepo, T body) {
		T doc = modelRepo.save(body);
		return doc;
	}
	
	public List<T> getAll(JpaRepository<T, Long> modelRepo, int pageNo, int pageSize, String sortBy, String direc) {
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(
				direc.equals("asc") ? Direction.ASC : Direction.DESC,
						sortBy
				));
		Page<T> docs = modelRepo.findAll(paging);
		return docs.getContent();
	}
}
