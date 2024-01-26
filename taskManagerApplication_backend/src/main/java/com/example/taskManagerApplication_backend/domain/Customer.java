package com.example.taskManagerApplication_backend.domain;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.hateoas.RepresentationModel;

import java.util.List;

@Data // will auto create the setters and getters (good maintainability)
@Entity // database will recognize table customer with the given attributes
public class Customer extends RepresentationModel<Customer> {

    @Id
    @Column(name = "customer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int customer_id; // id variable ... primary key
    @Column(name="First Name")
    private String customer_Fname;
    @Column(name="Last Name")
    private String customer_Lname;
    @Column(name="password")
    private String password;
    @Column(name="email")
    private String email;

    @Column(name="username")
    private String username;


    @OneToMany // One customer can have many tasks
    private List<Task> tasks;

    public Customer(String email, String password, String username,String customer_Fname, String customer_Lname){
        this.email=email;
        this.password=password;
        this.username = username;
        this.customer_Fname = customer_Fname;
        this.customer_Lname = customer_Lname;
    }

    public Customer(){

    }
}