package com.evmanagement.dto;

import java.util.List;

import com.evmanagement.entity.User;

import lombok.Data;

@Data
public class UsersResponseDto extends CommonApiResponse {
	
	private List<User> users;
	
}
