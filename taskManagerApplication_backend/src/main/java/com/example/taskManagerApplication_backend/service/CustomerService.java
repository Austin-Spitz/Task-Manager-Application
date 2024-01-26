package com.example.taskManagerApplication_backend.service;

import com.example.taskManagerApplication_backend.domain.Customer;
import com.example.taskManagerApplication_backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {

    @Autowired
    private final CustomerRepository customerRepository;

    public List<Customer> getAllCustomers(Customer customer){
        return customerRepository.findAll(); // finds all the customers
    }

    public Customer save(Customer customer){
        return customerRepository.save(customer);
    }

    public Optional<Customer> findById(int id){
        return customerRepository.findById(id);
    }

    public void deleteById(int id){
        customerRepository.deleteById(id);
    }
}
