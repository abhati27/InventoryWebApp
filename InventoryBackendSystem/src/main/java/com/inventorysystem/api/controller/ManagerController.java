package com.inventorysystem.api.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventorysystem.api.dto.MessageDto;
import com.inventorysystem.api.dto.StatusUpdateDto;
import com.inventorysystem.api.enums.OrderStatus;
import com.inventorysystem.api.enums.RoleType;
import com.inventorysystem.api.model.Address;
import com.inventorysystem.api.model.Inward;
import com.inventorysystem.api.model.Manager;
import com.inventorysystem.api.model.Order;
import com.inventorysystem.api.model.Product;
import com.inventorysystem.api.model.User;
import com.inventorysystem.api.service.AddressService;
import com.inventorysystem.api.service.InwardService;
import com.inventorysystem.api.service.ManagerService;
import com.inventorysystem.api.service.MyUserService;
import com.inventorysystem.api.service.OrderService;
import com.inventorysystem.api.service.ProductService;

@RestController
@RequestMapping("/manager")
@CrossOrigin(origins = {"http://localhost:3000"})

public class ManagerController {
	@Autowired
	private ManagerService managerService; 
	
	@Autowired
	private AddressService addressService; 
	
	@Autowired
	private MyUserService userService; 
	
	@Autowired
	private PasswordEncoder passwordEncoder; 
	
	@Autowired
	private InwardService inwardService;
	
	@Autowired
	private OrderService orderService; 
	
	@Autowired
	private ProductService productService; 
	
	@PostMapping("/add")
	public void signup(@RequestBody Manager manager) {
		//Detach the address, save it and re-attach to manager
		Address address = manager.getAddress();
		manager.setAddress(addressService.post(address));
		//Detach the user, save it and re-attach to manager
		User user = manager.getUser(); 
		user.setRole(RoleType.MANAGER);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		manager.setUser(userService.post(user));
		
		//save the manager 
		managerService.post(manager);		
	}
	
	@PutMapping("/order/status/update")
	public ResponseEntity<?> updateStatusAddToInwardAndUpdateProductQuantity(
			@RequestBody StatusUpdateDto dto) {
		//order id and status 
		 Order order = orderService.getById(dto.getOrderId());
	        order.setStatus(dto.getStatus());
	        //update order
	        orderService.post(order);
			//if APPROVED: then make entry in inward and update product qty 

	        if(order.getStatus().equals(OrderStatus.APPROVED)){
	             Product product = order.getProduct(); 
	            Inward inward = new Inward();
	            inward.setProduct(order.getProduct());
	            inward.setDateOfSupply(LocalDate.now());
	            inward.setInvoiceNumber("INV"+ (int)(Math.random()*100000));
	            inward.setQuantity(order.getQuantity());
	            inward.setReceiptNo("RCP" +  (int)( Math.random()*100000));
	            inward.setSupplier(order.getSupplier());
	            inward.setWarehouse(order.getWarehouse());
	            inwardService.post(inward);
	            product.setQuantity(product.getQuantity() + order.getQuantity());
	            productService.post(product);
	            return ResponseEntity.status(HttpStatus.OK).body(new MessageDto("Inward inserted, product updated"));
	        }
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageDto("Order not approved by manager"));
	}
}
