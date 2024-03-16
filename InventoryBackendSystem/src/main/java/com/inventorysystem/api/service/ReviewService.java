package com.inventorysystem.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventorysystem.api.exception.ResourceNotFoundException;
import com.inventorysystem.api.model.Product;
import com.inventorysystem.api.model.Review;
import com.inventorysystem.api.repository.ProductRepository;
import com.inventorysystem.api.repository.ReviewRepository;

@Service
public class ReviewService {

	@Autowired
	private ReviewRepository reviewRepository;
	@Autowired
	private ProductRepository productRepository;
	public Review post(Review review) {
		 
		return reviewRepository.save(review);
	}
	public List<Review> getByProductId(int pid) {
		 
		return reviewRepository.getByProductId(pid);
	}
	public Double getAverageRatingByProductId(int pid) throws ResourceNotFoundException {
	    Double averageRating = reviewRepository.findAverageRatingByProductId(pid);
	    if (averageRating == null) {
	        if (!productRepository.existsById(pid)) {
	            throw new ResourceNotFoundException("Product with ID: " + pid + " not found.");
	        } else {
	            return 0.0;
	        }
	    }
	    return averageRating;
	}

}
