package com.evmanagement.dto;

import java.util.List;

import lombok.Data;

@Data
public class BookingResponse extends CommonApiResponse {
	
	private List<BookingResponseDto> bookings;

}
