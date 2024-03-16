package com.inventorysystem.api.controller;

 import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventorysystem.api.dto.PurchaseStatDto;
import com.inventorysystem.api.enums.RoleType;
import com.inventorysystem.api.model.Address;
import com.inventorysystem.api.model.Customer;
import com.inventorysystem.api.model.User;
import com.inventorysystem.api.service.AddressService;
import com.inventorysystem.api.service.CustomerProductService;
import com.inventorysystem.api.service.CustomerService;
import com.inventorysystem.api.service.MyUserService;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = {"http://localhost:3000"})

public class CustomerController {

	@Autowired
	 private PasswordEncoder passwordEncoder;
	
	@Autowired
	private MyUserService userService; 
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private AddressService addressService;
	
	@Autowired
	private CustomerProductService customerProductService;
	@PostMapping("/add")
	public Customer customerSignUp(@RequestBody Customer customer ) {
		 
		//detach the address from customer, save it in DB and re-attach it to customer
		Address address= customer.getAddress();
		address = addressService.post(address);
		customer.setAddress(address);
		//detach the user from customer, save it in DB and re-attach it to customer
		User user = customer.getUser();
		user.setRole(RoleType.CUSTOMER);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user = userService.post(user);
		customer.setUser(user);
		
		return customerService.post(customer);
		 
	}
	/* 
	 API call Structure: 
	 {
    "name":"",
    "contact":"",
	    "address": {
	        "hno":"",
	        "street":"",
	        "city":"",
	        "zipcode":""
	    },
	    "user":{
	        "username":"",
	        "password":""
	    }
	} 
	 */
	
	@GetMapping("/product/stats")
	public PurchaseStatDto purchaseStatsByCategory() {
		return customerProductService.getAllRecords();
		
	}
}
