package com.inventorysystem.api.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventorysystem.api.dto.AverageRatingResponse;
import com.inventorysystem.api.dto.MessageDto;
import com.inventorysystem.api.dto.ProductDto;
import com.inventorysystem.api.dto.ProductPurchaseDto;
import com.inventorysystem.api.dto.ProductReviewDto;
import com.inventorysystem.api.dto.ReviewDto;
import com.inventorysystem.api.exception.ResourceNotFoundException;
import com.inventorysystem.api.model.Category;
import com.inventorysystem.api.model.Customer;
import com.inventorysystem.api.model.CustomerProduct;
import com.inventorysystem.api.model.Product;
import com.inventorysystem.api.model.Review;
import com.inventorysystem.api.service.CategoryService;
import com.inventorysystem.api.service.CustomerProductService;
import com.inventorysystem.api.service.CustomerService;
import com.inventorysystem.api.service.ProductService;
import com.inventorysystem.api.service.ReviewService;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ProductController {

	@Autowired
	private CategoryService categoryService;
	@Autowired
	private ProductService productService;
	@Autowired
	private ReviewService reviewService;
	@Autowired
	private CustomerService customerService; 
	@Autowired
	private CustomerProductService customerProductService;
	@PostMapping("/add/{catId}")
	public ResponseEntity<?> addProduct(@PathVariable("catId") int catId, @RequestBody Product product) {
		/* Validate product fields */
		if (product.getName() == null || product.getName().equals(""))
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageDto("Title is required"));
		
		if (product.getBrand() == null || product.getBrand().equals(""))
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageDto("Brand is required"));

		if (product.getPrice() == 0)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageDto("Price is required"));
		
		

		// Step 1: Fetch Category object from DB based on Category Id
		try {
			Category category = categoryService.getById(catId);
			// Step 2: set category to product obj
			product.setCategory(category);
			product = productService.post(product);
			return ResponseEntity.status(HttpStatus.OK).body(product);
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageDto(e.getMessage()));

		}
	}

	@GetMapping("/category/{catId}")
	public List<Product> getProductByCategory(@PathVariable("catId") int catId) {
		List<Product> list = productService.getProductByCategory(catId);
		return list;
	}

	@GetMapping("/review/{pid}")
	public ResponseEntity<?> getProductWithReviews(@PathVariable("pid") int pid, ProductReviewDto dto) {
	    try {
	        Product product = productService.getById(pid);
	        List<ReviewDto> list = reviewService.getByProductId(pid).stream()
	                                            .map(this::convertToDto)
	                                            .collect(Collectors.toList());
	        dto.setProduct(product);
	        dto.setReviews(list);
	        return ResponseEntity.status(HttpStatus.OK).body(dto);

	    } catch (ResourceNotFoundException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageDto(e.getMessage()));
	    }
	}

	private ReviewDto convertToDto(Review review) {
	    ReviewDto dto = new ReviewDto();
	    dto.setId(review.getId());
	    dto.setReviewText(review.getReviewText());
	    dto.setRating(review.getRating());
	    return dto;
	}
	
	@GetMapping("/{pid}/average-rating")
	public ResponseEntity<?> getAverageRatingOfProduct(@PathVariable("pid") int pid) {
	    try {
	        Double averageRating = reviewService.getAverageRatingByProductId(pid);
	        
	        if (averageRating == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found or has no reviews.");
	        }
	        
	        return ResponseEntity.ok(new AverageRatingResponse(averageRating));

	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	    }
	}


	
	@PostMapping("/customers/{cid}/products")
	public ResponseEntity<String> purchaseApi(@PathVariable("cid") int cid, 
	        @RequestBody ProductPurchaseDto dto) {
	    
	    Customer customer = customerService.getById(cid);
	    if(customer == null) {
	        return new ResponseEntity<>("Customer not found", HttpStatus.NOT_FOUND);
	    }

	    List<CustomerProduct> list = new ArrayList<>();
	    for(ProductPurchaseDto.Entry entry : dto.getEntries()) {
	        Product product = productService.getById(entry.getPid());
	        if(product == null) {
	            return new ResponseEntity<>("Product with ID " + entry.getPid() + " not found", HttpStatus.NOT_FOUND);
	        }

	        CustomerProduct cp = new CustomerProduct();
	        cp.setCustomer(customer);
	        cp.setProduct(product);
	        cp.setQuantity(entry.getQty());
	        cp.setDateOfPurchase(LocalDate.now());
	        cp.setCouponCode(dto.getCouponCode());
	        list.add(cp);
	    }
	    
	    customerProductService.postAll(list);
	    return new ResponseEntity<>("Purchase successful", HttpStatus.CREATED);
	}
	
	@GetMapping("/all")
	public List<Product> getAllProducts(){
		List<Product> list = productService.getAllProducts();
		return list;
		
		
	}
	
	//decide the warehouse based on the algorithm discussion 
	//and them make an entry in outward table. 
	
}
