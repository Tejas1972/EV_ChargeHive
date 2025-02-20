package com.evmanagement.controller;

import java.util.ArrayList;
import java.util.Arrays;
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

import com.evmanagement.dto.BookingResponse;
import com.evmanagement.dto.BookingResponseDto;
import com.evmanagement.dto.CommonApiResponse;
import com.evmanagement.dto.UpdateBookingStatusRequestDto;
import com.evmanagement.entity.Booking;
import com.evmanagement.entity.EvStation;
import com.evmanagement.entity.User;
import com.evmanagement.service.BookingService;
import com.evmanagement.service.EvStationService;
import com.evmanagement.service.UserService;
import com.evmanagement.utility.Helper;
import com.evmanagement.utility.Constants.BookingStatus;
import com.evmanagement.utility.Constants.TimeSlot;
import com.evmanagement.utility.Constants.UserRole;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/book/ground")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

	Logger LOG = LoggerFactory.getLogger(BookingController.class);

	@Autowired
	private BookingService bookingService;

	@Autowired
	private UserService userService;

	@Autowired
	private EvStationService stationService;

	@PostMapping("/")
	@ApiOperation(value = "Api to book Ev Station")
	public ResponseEntity<CommonApiResponse> bookStation(@RequestBody Booking booking) {
		LOG.info("Recieved request for booking hotel");

		System.out.println(booking);

		CommonApiResponse response = new CommonApiResponse();

		if (booking == null) {
			response.setSuccess(true);
			response.setResponseMessage("bad request, request data is missing");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (booking.getUserId() == 0) {
			response.setSuccess(true);
			response.setResponseMessage("bad request, user id is missing");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (booking.getGroundId() == 0) {
			response.setSuccess(true);
			response.setResponseMessage("bad request, Ev Station id is missing");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		EvStation station = stationService.getStationById(booking.getGroundId());

		if (station == null) {
			response.setSuccess(true);
			response.setResponseMessage("Ev Station not found in db");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		List<Booking> alreadyBooked = this.bookingService.getBookingByDateAndGroundIdAndTimeSlotAndStatus(booking.getDate(),
				booking.getGroundId(), booking.getTimeSlot(), BookingStatus.APPROVED.value());

		if (!alreadyBooked.isEmpty()) {
			response.setSuccess(true);
			response.setResponseMessage("Selected Slot is already booked, you may select different slot");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		booking.setStatus(BookingStatus.PENDING.value());
		booking.setBookingId(Helper.getAlphaNumericId());

		Booking bookedStation = this.bookingService.addBooking(booking);

		if (bookedStation != null) {
			response.setSuccess(true);
			response.setResponseMessage("Ev Station Booked Successfully, Please Check Approval Status on Booking Option");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		else {
			response.setSuccess(true);
			response.setResponseMessage("failed to book Ev Station");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/fetch/all")
	@ApiOperation(value = "Api to fetch all booked Ev Station")
	public ResponseEntity<BookingResponse> fetchAllStationBooking() {
		LOG.info("Recieved request for fetch all booking");

		BookingResponse response = new BookingResponse();
		
		List<BookingResponseDto> bookings = new ArrayList<>();

		List<Booking> allBookings = this.bookingService.getAllBooking();
		
		if(allBookings == null) {
			response.setSuccess(true);
			response.setResponseMessage("Bookings fetched successful");
			return new ResponseEntity<BookingResponse>(response, HttpStatus.OK);
		}

		for (Booking booking : allBookings) {

			BookingResponseDto b = new BookingResponseDto();

			User customer = this.userService.getUserById(booking.getUserId());
			EvStation ground = this.stationService.getStationById(booking.getGroundId());

			b.setBookingId(booking.getBookingId());
			b.setCustomerContact(customer.getContact());
			b.setCustomerName(customer.getFirstName() + " " + customer.getLastName());
			b.setDate(booking.getDate());
			b.setGroundId(booking.getGroundId());
			b.setGroundImage(ground.getImage());
			b.setGroundName(ground.getName());
			b.setId(booking.getId());
			b.setStatus(booking.getStatus());
			b.setTimeSlot(booking.getTimeSlot());
			b.setUserId(customer.getId());
			b.setPrice(String.valueOf(ground.getPrice()));

			bookings.add(b);
		}

		response.setBookings(bookings);
		response.setSuccess(true);
		response.setResponseMessage("Bookings fetched successful");
		return new ResponseEntity<BookingResponse>(response, HttpStatus.OK);

	}

	@GetMapping("/fetch")
	@ApiOperation(value = "Api to fetch my booked Ev Station")
	public ResponseEntity<BookingResponse> fetchMyBooking(@RequestParam("userId") int userId) {
		LOG.info("Recieved request for fetch all booking by using userId");

		BookingResponse response = new BookingResponse();
		
		List<BookingResponseDto> bookings = new ArrayList<>();

		List<Booking> allBookings = this.bookingService.getBookingsByUserId(userId);

		if(allBookings == null) {
			response.setSuccess(true);
			response.setResponseMessage("Bookings fetched successful");
			return new ResponseEntity<BookingResponse>(response, HttpStatus.OK);
		}
		
		for (Booking booking : allBookings) {

			BookingResponseDto b = new BookingResponseDto();

			User customer = this.userService.getUserById(booking.getUserId());
			EvStation ground = this.stationService.getStationById(booking.getGroundId());

			b.setBookingId(booking.getBookingId());
			b.setCustomerContact(customer.getContact());
			b.setCustomerName(customer.getFirstName() + " " + customer.getLastName());
			b.setDate(booking.getDate());
			b.setGroundId(booking.getGroundId());
			b.setGroundImage(ground.getImage());
			b.setGroundName(ground.getName());
			b.setId(booking.getId());
			b.setStatus(booking.getStatus());
			b.setTimeSlot(booking.getTimeSlot());
			b.setUserId(customer.getId());
			b.setPrice(String.valueOf(ground.getPrice()));

			bookings.add(b);
		}

		response.setBookings(bookings);
		response.setSuccess(true);
		response.setResponseMessage("Bookings fetched successful");
		return new ResponseEntity<BookingResponse>(response, HttpStatus.OK);

	}

	@GetMapping("/fetch/bookingId")
	@ApiOperation(value = "Api to fetch my booked Ev Station")
	public ResponseEntity<BookingResponse> fetchBooking(@RequestParam("id") int bookingId) {
		LOG.info("Recieved request for fetch all booking by booking Id ");
		
		BookingResponse response = new BookingResponse();

		Booking booking = this.bookingService.getBookById(bookingId);
		
		if(booking == null) {
			response.setSuccess(true);
			response.setResponseMessage("Booking not found in db");
			return new ResponseEntity<BookingResponse>(response, HttpStatus.BAD_REQUEST);
		}

		BookingResponseDto b = new BookingResponseDto();

		User customer = this.userService.getUserById(booking.getUserId());
		EvStation ground = this.stationService.getStationById(booking.getGroundId());

		b.setBookingId(booking.getBookingId());
		b.setCustomerContact(customer.getContact());
		b.setCustomerName(customer.getFirstName() + " " + customer.getLastName());
		b.setDate(booking.getDate());
		b.setGroundId(booking.getGroundId());
		b.setGroundImage(ground.getImage());
		b.setGroundName(ground.getName());
		b.setId(booking.getId());
		b.setStatus(booking.getStatus());
		b.setTimeSlot(booking.getTimeSlot());
		b.setUserId(customer.getId());
		b.setPrice(String.valueOf(ground.getPrice()));

		response.setBookings(Arrays.asList(b));
		response.setSuccess(true);
		response.setResponseMessage("Bookings fetched successful");
		return new ResponseEntity<BookingResponse>(response, HttpStatus.OK);

	}

	@GetMapping("/fetch/status")
	@ApiOperation(value = "Api to fetch all booking status")
	public ResponseEntity<?> fetchAllBookingStatus() {
		LOG.info("Recieved request for fetch all booking status");

		List<String> response = new ArrayList<>();

		for (BookingStatus status : BookingStatus.values()) {
			response.add(status.value());
		}

		return new ResponseEntity(response, HttpStatus.OK);

	}

	@PostMapping("/update/status")
	@ApiOperation(value = "Api to update Ev Station booking")
	public ResponseEntity<CommonApiResponse> updateStationBookingStatus(@RequestBody UpdateBookingStatusRequestDto request) {

		LOG.info("Recieved request for updating the Ev Station Booking Status");

		CommonApiResponse response = new CommonApiResponse();
		
		if (request == null) {
			response.setSuccess(true);
			response.setResponseMessage("bad request, data is missing");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		Booking book = this.bookingService.getBookById(request.getBookingId());
		
		if(book == null) {
			response.setSuccess(true);
			response.setResponseMessage("booking not found in db");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (BookingStatus.APPROVED.value().equals(request.getStatus())) {
			List<Booking> alreadyApprovedBookings = this.bookingService.getBookingByDateAndGroundIdAndTimeSlotAndStatus( book.getDate(),
					book.getGroundId(), book.getTimeSlot(), BookingStatus.APPROVED.value());
			if (alreadyApprovedBookings.isEmpty()) {
				
				User user = this.userService.getUserById(book.getUserId());
				EvStation ground = this.stationService.getStationById(book.getGroundId());
				
				if(user.getWalletAmount() < ground.getPrice()) {
					response.setSuccess(true);
					response.setResponseMessage("Insufficient User Wallet Balance, Failed to Approve!!!");
					return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
				}
				
				user.setWalletAmount(user.getWalletAmount() - ground.getPrice());
				this.userService.updateUser(user);
				
				book.setStatus(request.getStatus());
				this.bookingService.addBooking(book);
				
				response.setSuccess(true);
				response.setResponseMessage("Booking" + book.getStatus() + "Successfully");
				return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
			}
			
			else {
				response.setSuccess(true);
				response.setResponseMessage("Can't Approve Booking, Slot already used");
				return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

			}
			
		}

		if (BookingStatus.PENDING.value().equals(request.getStatus())) {
			response.setSuccess(true);
			response.setResponseMessage("Can't update Booking status to Pending");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
			
		}

		// cancel status
		book.setStatus(request.getStatus());
		Booking cancelledBooking = this.bookingService.addBooking(book);

		if(cancelledBooking != null) {
			response.setSuccess(true);
			response.setResponseMessage("Booking" + book.getStatus() + "Successfully");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		} else {
			response.setSuccess(true);
			response.setResponseMessage("Failed to cancel the booking");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/fetch/slots")
	@ApiOperation(value = "Api to fetch all booking time slots")
	public ResponseEntity<?> fetchAllBookingTimeSlot() {
		LOG.info("Recieved request for fetch all time slots");

		List<String> response = new ArrayList<>();

		for (TimeSlot slot : TimeSlot.values()) {
			response.add(slot.value());
		}

		return new ResponseEntity(response, HttpStatus.OK);

	}

}
