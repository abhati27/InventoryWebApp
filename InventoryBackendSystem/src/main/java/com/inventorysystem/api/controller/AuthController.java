package com.inventorysystem.api.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventorysystem.api.model.Customer;
import com.inventorysystem.api.model.Executive;
import com.inventorysystem.api.model.Supplier;
import com.inventorysystem.api.model.User;
import com.inventorysystem.api.service.CustomerService;
import com.inventorysystem.api.service.ExecutiveService;
import com.inventorysystem.api.service.MyUserService;
import com.inventorysystem.api.service.SupplierService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3000"})
public class AuthController {

	@Autowired
	private MyUserService myUserService;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private ExecutiveService executiveService;
	
	@Autowired
	private SupplierService supplierService; 
	
	@GetMapping("/login")
	public ResponseEntity<?> login(Principal principal) {  
		//if this api gets called, spring has already verified username/password
		//so ask spring username of loggedin user. 
		String username = principal.getName();
		/* Fetch user details for this username */
		User user = (User) myUserService.loadUserByUsername(username);
		switch(user.getRole().toString()) {
		case "CUSTOMER":
			//fetch customer details 
			Customer customer = customerService.getByUsername(username);
			return ResponseEntity.status(HttpStatus.OK).body(customer); 
		case "EXECUTIVE":
			Executive executive = executiveService.getByUsername(username);
			return ResponseEntity.status(HttpStatus.OK).body(executive); 
		case "SUPPLIER":
			Supplier supplier = supplierService.getByUsername(username);
			return ResponseEntity.status(HttpStatus.OK).body(supplier); 	
			
		}
		return null;
		
	}
	
	@GetMapping("password-reset")
	public void resetPassword() {
		
	}
}



