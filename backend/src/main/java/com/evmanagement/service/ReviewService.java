package com.evmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evmanagement.dao.ReviewDao;
import com.evmanagement.entity.Review;

@Service
public class ReviewService {
	
	@Autowired
	private ReviewDao reviewDao;
	
	public Review addHotelReview(Review review) {
		return reviewDao.save(review);
	}
	
	public List<Review> fetchReviews(int groundId) {
		return reviewDao.findByGroundId(groundId);
	}

}
