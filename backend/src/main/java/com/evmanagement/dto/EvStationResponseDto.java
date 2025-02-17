package com.evmanagement.dto;

import java.util.List;

import com.evmanagement.entity.EvStation;

import lombok.Data;

@Data
public class EvStationResponseDto extends CommonApiResponse {
	
	private List<EvStation> grounds;

}
