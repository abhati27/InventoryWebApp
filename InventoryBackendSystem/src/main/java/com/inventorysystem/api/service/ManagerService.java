package com.inventorysystem.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventorysystem.api.model.Manager;
import com.inventorysystem.api.repository.ManagerRepository;

@Service
public class ManagerService {

	@Autowired
	private ManagerRepository managerRepository; 
	
	public void post(Manager manager) {
		managerRepository.save(manager);
		
	}
	
	public Manager getById(int managerId) {
		return managerRepository.findById(managerId).get();
	}

}
