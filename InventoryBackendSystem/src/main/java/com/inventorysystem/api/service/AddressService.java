package com.inventorysystem.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventorysystem.api.model.Address;
import com.inventorysystem.api.repository.AddressRepository;

@Service
public class AddressService {

	@Autowired
	private AddressRepository addressRepository;

	public Address post(Address address) {
		return addressRepository.save(address);
	} 
	
	
}
