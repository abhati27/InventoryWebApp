package com.inventorysystem.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventorysystem.api.dto.MessageDto;
import com.inventorysystem.api.enums.RoleType;
import com.inventorysystem.api.model.Executive;
import com.inventorysystem.api.model.User;
import com.inventorysystem.api.service.ExecutiveService;
import com.inventorysystem.api.service.MyUserService;

@RestController
@RequestMapping("/executive")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ExecutiveController {

	@Autowired
	private ExecutiveService executiveService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private MyUserService userService; 
	
	@PostMapping("/add")
	public ResponseEntity<MessageDto> post(@RequestBody Executive executive) {
	    try {
	        // detach user, save and re-attach
	        User user = executive.getUser();
	        user.setRole(RoleType.EXECUTIVE);
	        user.setPassword(passwordEncoder.encode(user.getPassword()));
	        user = userService.post(user);
	        
	        executive.setUser(user);
	        
	        // save the executive
	        executiveService.post(executive);

	        return ResponseEntity.status(HttpStatus.OK).body(new MessageDto("New Executive added!!"));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageDto("Error adding executive: " + e.getMessage()));
	    }
	}
}
