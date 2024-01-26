package com.example.taskManagerApplication_backend.controller;

import com.example.taskManagerApplication_backend.domain.Task;
import com.example.taskManagerApplication_backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequiredArgsConstructor
@RequestMapping("/taskManager")
@CrossOrigin(origins = "https://localhost:3000")
// taskController: implements operations defiend by an application's API
public class TaskController {

    @Autowired
    private final TaskService taskService;

    // home page link
    @GetMapping("/home")
    public ResponseEntity<HomeData> getData(){
        HomeData data = new HomeData();

        data.setData("Home Page");
        return new ResponseEntity<>(data, HttpStatus.OK);
    }


    // getting all tasks
    @GetMapping("/allTasks")
    public List<Task> getAllTasks(Task task){

        return taskService.getAllTasks(task);
    }


    @PostMapping("/addTasks") // adding item to list
    public ResponseEntity<Task> addTasks(@RequestBody Task task){

        Task it =  taskService.save(task);
        it.add(linkTo(methodOn(TaskController.class).getData()).withRel("taskManager")); // HATEOUS... 'taskManager' is name of the link


        return new ResponseEntity<>(it, HttpStatus.CREATED);//itemService.addItem(item);
    }

    // delete task
    @DeleteMapping("/delete/{id}") // delete task
    public void deleteTaskById(@PathVariable("id") int id){
        taskService.deleteById(id);
    }


}
