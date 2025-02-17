package com.evmanagement.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class EvStation {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	private String description;
	
	private String chargerType;
	private double chargingPoints; // w
	
	private double chargingSpeed;// h
	
	private double pincode;   //l
	
	private String image;
	
	private double price;
	
	private int status;

}
