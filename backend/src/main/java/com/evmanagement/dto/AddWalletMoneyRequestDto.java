package com.evmanagement.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class AddWalletMoneyRequestDto {
	
	private int userId;
	
	private double  walletAmount;

}
