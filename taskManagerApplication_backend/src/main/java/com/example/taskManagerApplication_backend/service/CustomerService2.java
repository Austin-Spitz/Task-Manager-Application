package com.example.taskManagerApplication_backend.service;


import com.example.taskManagerApplication_backend.Dto.CustomerDTO;
import com.example.taskManagerApplication_backend.Dto.LoginDTO;
import com.example.taskManagerApplication_backend.response.LoginResponse;
import org.springframework.stereotype.Service;

@Service
public interface CustomerService2 {

    String addCustomer(CustomerDTO customerDTO);

    LoginResponse loginCustomer(LoginDTO loginDTO);
}
