package com.evmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.evmanagement.entity.EvStation;

@Repository
public interface EvStationDao extends JpaRepository<EvStation, Integer> {
	
	List<EvStation> findByStatus(int status);

}
