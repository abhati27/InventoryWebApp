package com.inventorysystem.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventorysystem.api.model.Customer;
import com.inventorysystem.api.repository.CustomerRepository;

@Service
public class CustomerService {

	@Autowired
	private CustomerRepository customerRepository;

	public Customer post(Customer customer) {
		 
		return customerRepository.save(customer);
	}

	public Customer getByUsername(String username) {
		 
		return customerRepository.getByUsername(username);
	}

	public Customer getById(int cid) {
		
		return customerRepository.findById(cid).get();
	}
	
	
}
