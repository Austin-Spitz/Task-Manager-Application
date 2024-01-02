package com.example.taskManagerApplication_backend.service;


import com.example.taskManagerApplication_backend.domain.Task;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.taskManagerApplication_backend.repository.TaskRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    @Autowired
    private final TaskRepository taskRepository;

    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks(Task task){
        return taskRepository.findAll(); // finding all tasks
    }

    public void deleteById(int id){
        taskRepository.deleteById(id);
    }


}
