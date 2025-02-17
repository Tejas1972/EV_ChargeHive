package com.evmanagement.dto;

import org.springframework.web.multipart.MultipartFile;
import lombok.Data;

@Data
public class EvStationAddRequest {
	
	private int id;

    private String name;
	
	private String description;
    private String chargerType;
	
	private double chargingPoints;
	
	private double chargingSpeed;
	
	private double pincode;
	
	private double price;
	
	private MultipartFile image;	
	

}
