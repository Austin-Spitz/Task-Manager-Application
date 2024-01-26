package com.example.taskManagerApplication_backend.controller;

import com.example.taskManagerApplication_backend.Dto.CustomerDTO;
import com.example.taskManagerApplication_backend.Dto.LoginDTO;
import com.example.taskManagerApplication_backend.domain.Customer;
import com.example.taskManagerApplication_backend.response.LoginResponse;
import com.example.taskManagerApplication_backend.service.CustomerService;
import com.example.taskManagerApplication_backend.service.CustomerService2;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequiredArgsConstructor
@RequestMapping("/taskManager")
@CrossOrigin(origins = "https://localhost:3000")
// CustomerController: implements operations defiend by an application's API
public class CustomerController {

    @Autowired
    private final CustomerService customerService;

    @Autowired
    private final CustomerService2 customerService2;


    // sign up ... creating account
    @PostMapping("/save")
    public String saveCustomer(@RequestBody CustomerDTO customerDTO){
        String id = customerService2.addCustomer(customerDTO);
        return id;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginCustomer(@RequestBody LoginDTO loginDTO){
        LoginResponse loginResponse = customerService2.loginCustomer(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }


    // login page link
    @GetMapping("/test")
    public ResponseEntity<HomeData> getData(){
        System.out.println("Request received");
        HomeData data = new HomeData();

        data.setData("Login Page");
        return new ResponseEntity<>(data, HttpStatus.OK);
    }


    // getting all customers
    @GetMapping("/allCustomers")
    public List<Customer> getAllCustomers(Customer customer){

        return customerService.getAllCustomers(customer);
    }

    // getting the username
    @GetMapping("/getUser/{customer_id}")
    public Optional<Customer> getUser(@PathVariable("customer_id") int customer_id){
        return customerService.findById(customer_id);
    }


    @PostMapping("/addCustomer") // adding customer to list
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer){

        Customer it =  customerService.save(customer);
        it.add(linkTo(methodOn(TaskController.class).getData()).withRel("taskManager")); // HATEOUS... 'taskManager' is name of the link


        return new ResponseEntity<>(it, HttpStatus.CREATED);//itemService.addItem(item);
    }

    // delete customer
    @DeleteMapping("/deleteCustomer/{customer_id}") // delete task
    public void deleteCustomerById(@PathVariable("customer_id") int customer_id){
        customerService.deleteById(customer_id);
    }


}