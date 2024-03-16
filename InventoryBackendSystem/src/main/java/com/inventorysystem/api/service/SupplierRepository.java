package com.inventorysystem.api.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.inventorysystem.api.model.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Integer>{

	@Query("select s from Supplier s where s.user.username=?1")
	Supplier getByUsername(String username);

}
