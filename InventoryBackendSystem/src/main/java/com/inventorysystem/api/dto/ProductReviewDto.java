package com.inventorysystem.api.dto;

import java.util.List;

import org.springframework.stereotype.Component;

import com.inventorysystem.api.model.Product;

@Component
public class ProductReviewDto {

    private Product product;
    private List<ReviewDto> reviews;  // Changed this line

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public List<ReviewDto> getReviews() {   // Updated return type
        return reviews;
    }

    public void setReviews(List<ReviewDto> reviews) {   // Updated parameter type
        this.reviews = reviews;
    }
}
