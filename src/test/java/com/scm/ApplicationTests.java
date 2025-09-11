package com.scm;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.scm.services.EmailServices;

@SpringBootTest
class ApplicationTests {

	@Autowired
	private EmailServices service;

	@Test
	void contextLoads() {
	}

	@Test
	void sendEmailTest(){
		service.sendEmail(
			"johaibansari002@gmail.com",
			"Testing email services",
			"Working on email service"
		);
	}
}
