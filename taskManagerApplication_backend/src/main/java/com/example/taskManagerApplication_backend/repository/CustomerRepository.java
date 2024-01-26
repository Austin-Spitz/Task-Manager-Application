package com.example.taskManagerApplication_backend.repository;

import com.example.taskManagerApplication_backend.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> { // extends jpaRepos.. that passes in Customer and Integer Id from Customer

    Optional<Customer> findOneByUsernameAndPassword(String username, String password);

    Customer findByUsername(String username);
}
