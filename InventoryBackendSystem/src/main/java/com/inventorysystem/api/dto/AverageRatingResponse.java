package com.inventorysystem.api.dto;

public class AverageRatingResponse {
    private Double averageRating;

    public AverageRatingResponse(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }
}