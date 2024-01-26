package com.example.taskManagerApplication_backend.Dto;

import lombok.Data;

@Data
public class CustomerDTO {

    // creating variables for customer info
    private Integer customer_id; // id variable ... primary key
    private String customer_Fname;
    private String customer_Lname;
    private String password;
    private String email;
    private String username;


    public CustomerDTO(String email, String password, String username, String customer_Fname, String customer_Lname){
        this.email = email;
        this.password = password;
        this.username = username;
        this.customer_Fname = customer_Fname;
        this.customer_Lname = customer_Lname;
    }

}
