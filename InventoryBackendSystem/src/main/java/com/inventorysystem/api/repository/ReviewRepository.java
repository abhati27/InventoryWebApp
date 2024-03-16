package com.inventorysystem.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.inventorysystem.api.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer>{

	@Query("select r from Review r where r.product.id=?1")
	List<Review> getByProductId(int pid);
	
	@Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.id = :productId")
    Double findAverageRatingByProductId(int productId);


}
