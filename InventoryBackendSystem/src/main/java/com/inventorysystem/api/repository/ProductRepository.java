package com.inventorysystem.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.inventorysystem.api.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{

	@Query("select p from Product p where p.category.id=?1")
	List<Product> getProductByCategory(int catId);

}
