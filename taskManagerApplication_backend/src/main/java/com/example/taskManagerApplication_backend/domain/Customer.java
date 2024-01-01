package com.example.taskManagerApplication_backend.domain;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.hateoas.RepresentationModel;

@Data // will auto create the setters and getters (good maintainability)
@Entity // database will recognize table customer with the given attributes
public class Customer extends RepresentationModel<Customer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    // creating variables for customer info
    private Integer id; // id variable
    private String userId;
    private String name;

}
