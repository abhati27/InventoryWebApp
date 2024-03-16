package com.inventorysystem.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventorysystem.api.model.Executive;
import com.inventorysystem.api.repository.ExecutiveRepository;

@Service
public class ExecutiveService {

	@Autowired
	private ExecutiveRepository executiveRepository; 
	
	public void post(Executive executive) {
		executiveRepository.save(executive);
		
	}

	public Executive getByUsername(String username) {
		 
		return executiveRepository.getByUsername(username);
	}

}
