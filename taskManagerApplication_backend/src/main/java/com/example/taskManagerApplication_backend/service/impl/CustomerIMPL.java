package com.example.taskManagerApplication_backend.service.impl;

import com.example.taskManagerApplication_backend.Dto.CustomerDTO;
import com.example.taskManagerApplication_backend.Dto.LoginDTO;
import com.example.taskManagerApplication_backend.domain.Customer;
import com.example.taskManagerApplication_backend.repository.CustomerRepository;
import com.example.taskManagerApplication_backend.response.LoginResponse;
import com.example.taskManagerApplication_backend.service.CustomerService2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerIMPL implements CustomerService2 {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    public PasswordEncoder passwordEncoder;


    @Override
    public String addCustomer(CustomerDTO customerDTO) {

        Customer customer = new Customer(
                customerDTO.getEmail(),
                this.passwordEncoder.encode(customerDTO.getPassword()),
                customerDTO.getUsername(),
                customerDTO.getCustomer_Fname(),
                customerDTO.getCustomer_Lname()
        );
        customerRepository.save(customer);
        return customer.getCustomer_Fname() + " " + customer.getCustomer_Lname();
    }

    @Override
    public LoginResponse loginCustomer(LoginDTO loginDTO) {
        Customer customer1 = customerRepository.findByUsername(loginDTO.getUsername()); // customer object that retrieves customer by email

        if(customer1 !=null){ // if it's found (not null)
            String password = loginDTO.getPassword(); // retrieving the password
            String encodedPassword = customer1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword); // do the passwords match???
            if(isPwdRight){ // if they match
                Optional<Customer> customer = customerRepository.findOneByUsernameAndPassword(loginDTO.getUsername(), encodedPassword);
                if(customer.isPresent()){
                    return new LoginResponse("Login Success", true);
                }else{
                    return new LoginResponse("Login Failed", false);
                }
            }else{
                return new LoginResponse("Password Does Not Match", false);
            }
        }else{
            return new LoginResponse("Email Does Not Match ", false);
        }
    }

}
