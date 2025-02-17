package com.evmanagement.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.evmanagement.dto.CommonApiResponse;
import com.evmanagement.dto.EvStationAddRequest;
import com.evmanagement.dto.EvStationResponseDto;
import com.evmanagement.entity.EvStation;
import com.evmanagement.service.EvStationService;
import com.evmanagement.utility.StorageService;
import com.evmanagement.utility.Constants.TurfStatus;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/ground/")
@CrossOrigin(origins = "http://localhost:3000")
public class EvStationController {
	
	Logger LOG = LoggerFactory.getLogger(EvStationController.class);
	
	@Autowired
	private EvStationService stationService;
	
	@Autowired
	private StorageService storageService;
	
	
	@PostMapping("add")
	@ApiOperation(value = "Api to add Ev Station")
	public ResponseEntity<CommonApiResponse> addStation(EvStationAddRequest stationAddRequest) {
		LOG.info("Recieved request for Add EvStation");

		CommonApiResponse response = new CommonApiResponse();

		if (stationAddRequest == null) {
			response.setSuccess(true);
			response.setResponseMessage("bad request, request data is missing");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}
		
		EvStation station = new EvStation();
		station.setDescription(stationAddRequest.getDescription());
		station.setChargingSpeed(stationAddRequest.getChargingSpeed());
		station.setChargingPoints(stationAddRequest.getChargingPoints());
		station.setChargerType(stationAddRequest.getChargerType());
		station.setName(stationAddRequest.getName());
        station.setPrice(stationAddRequest.getPrice());
        station.setPincode(stationAddRequest.getPincode());
		station.setStatus(TurfStatus.ACTIVE.value());
        
        String image = storageService.store(stationAddRequest.getImage());
        
        station.setImage(image);
        
        EvStation addedGround = this.stationService.addStation(station);
        
		if (addedGround != null) {
			response.setSuccess(true);
			response.setResponseMessage("Ev Station Added Successfully");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		else {
			response.setSuccess(true);
			response.setResponseMessage("Failed to add Ev Station");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("id")
	@ApiOperation(value = "Api to fetch stations by using EvStation Id")
	public ResponseEntity<EvStationResponseDto> fetchStation(@RequestParam("groundId") int groundId) {
		LOG.info("Recieved request for Fetch station using station Id");

		EvStationResponseDto response = new EvStationResponseDto();
		
		if(groundId == 0) {
			response.setSuccess(true);
			response.setResponseMessage("bad request, station id not found");
			return new ResponseEntity<EvStationResponseDto>(response, HttpStatus.BAD_REQUEST);
		}
		
		EvStation Station = null;
		
		Station = this.stationService.getStationById(groundId);
		
		if(Station == null) {
			response.setSuccess(true);
			response.setResponseMessage("station not found");
			return new ResponseEntity<EvStationResponseDto>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.setGrounds(Arrays.asList(Station));
		response.setSuccess(true);
		response.setResponseMessage("evstation fetched successfully");
		return new ResponseEntity<EvStationResponseDto>(response, HttpStatus.OK);

	}

	@GetMapping("fetch")
	@ApiOperation(value = "Api to fetch all stations")
	public ResponseEntity<EvStationResponseDto> fetchAllStations() {
		LOG.info("Recieved request for Fetch stations");
		
		EvStationResponseDto response = new EvStationResponseDto();

		List<EvStation> Stations = new ArrayList<>();
		
		Stations = this.stationService.getAllStationByStatus(TurfStatus.ACTIVE.value());
		
        response.setGrounds(Stations);
        response.setSuccess(true);
		response.setResponseMessage("stations fetched successfully");
		return new ResponseEntity<EvStationResponseDto>(response, HttpStatus.OK);

	}
	
	@DeleteMapping("delete")
	@ApiOperation(value = "Api to delete the stations")
	public ResponseEntity<CommonApiResponse> deleteStation(@RequestParam("groundId") int groundId) {
		LOG.info("Recieved request for deleting the stations");
		
		CommonApiResponse response = new CommonApiResponse();

		if(groundId == 0) {
			response.setSuccess(true);
			response.setResponseMessage("missing stations id");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}
		
		EvStation station = this.stationService.getStationById(groundId);
		
		if(station == null) {
			response.setSuccess(true);
			response.setResponseMessage("station not found");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		station.setStatus(TurfStatus.DELETED.value());
		
		EvStation updatedStation = this.stationService.addStation(station); // it will set ground as deleted
		
		if(updatedStation != null) {
			response.setSuccess(true);
			response.setResponseMessage("station deleted successfully");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		} else {
			response.setSuccess(true);
			response.setResponseMessage("failed to delete the station");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}
		
		
        

	}
	
	@GetMapping(value="/{groundImageName}", produces = "image/*")
	@ApiOperation(value = "Api to fetch station image by using image name")
	public void fetchProductImage(@PathVariable("groundImageName") String groundImageName, HttpServletResponse resp) {
		System.out.println("request came for fetching station pic");
		System.out.println("Loading file: " + groundImageName);
		Resource resource = storageService.load(groundImageName);
		if(resource != null) {
			try(InputStream in = resource.getInputStream()) {
				ServletOutputStream out = resp.getOutputStream();
				FileCopyUtils.copy(in, out);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		System.out.println("response sent!");
	}
	
}
