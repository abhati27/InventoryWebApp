package com.inventorysystem.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventorysystem.api.dto.PurchaseStatDto;
import com.inventorysystem.api.model.Category;
import com.inventorysystem.api.model.CustomerProduct;
import com.inventorysystem.api.repository.CustomerProductRepository;

@Service
public class CustomerProductService {

	@Autowired
	private CustomerProductRepository customerProductRepository; 
	
	public void postAll(List<CustomerProduct> list) {
		customerProductRepository.saveAll(list);
		
	}

	public PurchaseStatDto getAllRecords() {
		 final List<String> listCatName = new ArrayList<>(); 
		 List<Category> listCat = new ArrayList<>(); 
		 final List<Integer> listCountCustomer = new ArrayList<>(); 
		 List<CustomerProduct> list = customerProductRepository.findAll();
 		 
		  list.stream().map(e->e.getProduct()).distinct()
		  		.forEach(p->{
		  			listCatName.add(p.getCategory().getName());
		  			listCat.add(p.getCategory()); 
		  		});
				 						
		  listCat.stream().forEach(c->{
			  int count =  customerProductRepository.countCustomers(c.getId());
			  listCountCustomer.add(count);
		  });
		  
		  List<String> label = listCatName.stream().distinct().collect(Collectors.toList());
		  List<Integer> data = listCountCustomer.stream().distinct().collect(Collectors.toList());
		  
		  PurchaseStatDto dto = new PurchaseStatDto();
		  dto.setData(data);
		  dto.setLabels(label);
		  return dto; 
		 
	 
	}

}
