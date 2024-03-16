package com.inventorysystem.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventorysystem.api.model.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

}
