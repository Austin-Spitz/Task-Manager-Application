package com.example.taskManagerApplication_backend.repository;


import com.example.taskManagerApplication_backend.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
// Repository: talks to the database and gets the data back
public interface TaskRepository extends JpaRepository<Task, Integer> {


}
