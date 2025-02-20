package com.evmanagement.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.evmanagement.dto.CommonApiResponse;
import com.evmanagement.dto.ReviewDto;
import com.evmanagement.dto.ReviewResponseDto;
import com.evmanagement.entity.Review;
import com.evmanagement.entity.User;
import com.evmanagement.service.ReviewService;
import com.evmanagement.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/ground/review")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
	
	Logger LOG = LoggerFactory.getLogger(ReviewController.class);

	@Autowired
	private ReviewService reviewService;
	
    @Autowired
    private UserService userService;
	
	@PostMapping("add")
	@ApiOperation(value = "Api to add Ev Station REVIEW")
	public ResponseEntity<CommonApiResponse> register(@RequestBody Review review) {
		LOG.info("Recieved request for Add Ev StationReview");

		CommonApiResponse response = new CommonApiResponse();

		if (review == null) {
			response.setSuccess(true);
			response.setResponseMessage("Failed to add review");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}
		
		Review hotelReview = reviewService.addHotelReview(review);
		
		if (hotelReview != null) {
			response.setSuccess(true);
			response.setResponseMessage("Review Added Successfully");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		else {
			response.setSuccess(true);
			response.setResponseMessage("Failed to add review");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("fetch")
	@ApiOperation(value = "Api to fetch all reviews of Ev Station")
	public ResponseEntity<?> fetchHotelReview(@RequestParam("groundId") int groundId) {
		LOG.info("Recieved request for Fetch Reviews for Ev Station Id : "+groundId);

		ReviewResponseDto response = new ReviewResponseDto();

		List<Review> reviews = reviewService.fetchReviews(groundId);
		
		List<ReviewDto> reviewDto = new ArrayList<>();
		
		for(Review review : reviews) {
			
			User user = userService.getUserById(review.getUserId());
			
			reviewDto.add(new ReviewDto(user.getFirstName(), review.getStar(), review.getReview()));
			
		}
		
		
		try {
			response.setReviews(reviewDto);
		    response.setSuccess(true);
			response.setResponseMessage("Reviews Fetched Successfully");
			return new ResponseEntity(response, HttpStatus.OK);

		} catch (Exception e) {
			LOG.error("Exception Caught");
			response.setSuccess(true);
			response.setResponseMessage("Failed to Fetch Reviews");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
}
