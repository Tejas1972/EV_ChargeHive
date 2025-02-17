package com.evmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evmanagement.dao.EvStationDao;
import com.evmanagement.entity.EvStation;

@Service
public class EvStationService {
	
	@Autowired
	private EvStationDao stationDao;
	
	public EvStation addStation(EvStation ground) {
		return stationDao.save(ground);
	}
	 
	public EvStation getStationById(int groundId) {
		return stationDao.findById(groundId).get();
	}
	
	public List<EvStation> getAllStationByStatus(int status) {
		return this.stationDao.findByStatus(status);
	}
	
	public void deleteStation(EvStation ground) {
		this.stationDao.delete(ground);
	}
}
