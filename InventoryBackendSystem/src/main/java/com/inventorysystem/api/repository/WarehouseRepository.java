package com.inventorysystem.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventorysystem.api.model.Warehouse;

public interface WarehouseRepository extends JpaRepository<Warehouse, Integer>{

}
