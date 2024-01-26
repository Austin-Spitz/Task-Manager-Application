package com.example.taskManagerApplication_backend.domain;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.hateoas.RepresentationModel;

@Data // will auto create the setters and getters (good maintainability)
@Entity // database will recognize table customer with the given attributes
public class Task extends RepresentationModel<Customer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    // creating variables for user information

    private Integer id; // key
    private String taskDescription;
    private String priority;
    private String date; // date the task was created
    private String deadline; // deadline for the task

    @ManyToOne // A single customer can have many tasks
    @JoinColumn(name="customer_id") // foreign key column
    private Customer customer;

}
