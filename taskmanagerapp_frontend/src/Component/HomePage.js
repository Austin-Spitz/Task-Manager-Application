import React, {useEffect} from "react";
import NavHeader from "./NavHeader";
import 'bootstrap/dist/css/bootstrap.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CardC from "./cardC";
import "../style.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function HomePage(){
    
    // handling date component
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // zero-indexed
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const ddmmyy = year+"/"+month+"/"+day


    // useState array that holds all of the task
    const [tasks, setTasks] = React.useState([]);

    // useState to handle offCanvas component
    const [show, setShow] = React.useState(false);

    const [sendRequest, setSendRequest] = React.useState(false);

    // useState to determine when the api fetch should begin
    function handleSendRequest(){
      setSendRequest(prevRequest => !prevRequest)
    }
    
    // will hold the task length that will be displayed with the card
    let index = tasks.length

    let databaseIdCounter = index

    // useState to hold the task object information
    const [task, setTask] = React.useState({
        id: index,
        date: ddmmyy,
        priority: "High",
        deadline: "",
        taskDescription: ""
      })

    // handles change made to the input fields
    function handleTaskChange(event){
        const {name, value} = event.target

        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }))
    }

    

    // useEffect that will POST a new task
    useEffect(() => {
      if(sendRequest){
            fetch(`http://localhost:8080/taskManager/addTasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            })
            .then((response) => response.json())
            .then((actualData) => console.log(actualData))
            .catch((err) => {
                console.log(err.message);
            })
            .finally(() => {
                setSendRequest(false)
                setTask("")
                handleAddTask()
            })
            
          }
        
    }, [sendRequest]);

    // useEffect that will GET a new task
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/taskManager/allTasks`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
          }
    
          const data = await response.json();
          setTasks(data);
        } catch (error) {
          console.error("Error fetching tasks:", error.message);
        } finally {
        }
      };

      if (true) {
        fetchData();
      }
    }, []);
    

    // logic for opening / closing the forms
    const handleFormClose = () => setShow(false);
    const handleFormShow = () => setShow(true);

    function handleChange(event){
        const {name, value} = event.target // taking in the name and value

        setTask(prevTask => ({ // setting the task
            ...prevTask, // using prevTask data, but changing the name to the value
            [name]: value
        }))
    }

    // function that will handle logic in regards to dynamically creating cards
    const handleAddTask = () => {
  setTasks((prevTasks) => {
    const updatedTasks = [...prevTasks, task];
    return updatedTasks;
  });
    };

    return (
        <div>
            <NavHeader/>

            <div className="homePageIntro-style">
              <h1>Hello,</h1>
              <p>Your tasks await you below:</p>
            </div>


            <div className="cardButton--style">
            {/*Dynamically creating cards that hold the task information*/} 
            {tasks.map((task, index, tasks) => (
              <CardC key={task.id} task={task} index={index} tasks={tasks}/>
            ))}
            

           

            
            <button className="addTaskButton--style" onClick={handleFormShow}>+ Add Task</button>
            </div>

            {/*Form logic*/}
            <Offcanvas show={show} onHide={handleFormClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="formTitle--style">Task #{index+1}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="form--style">
            <form>
                <br/>
                <TextField className="textField--style" placeholder="Enter your Task..." id="outlined-multiline-static" autoComplete="off" value={task.taskDescription} name="taskDescription" onChange={handleChange} multiline rows={4} ></TextField> <br/>
                <br/>
                <TextField className="textField--style" placeholder="Enter your Deadline..." type="text" autoComplete="off" value={task.deadline} name = "deadline" onChange={handleChange}></TextField>
                <br/> <br/>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Priority</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={task.priority}
          className="textField--style"
          name="priority"
          onChange={handleChange}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
      </FormControl>
                {/*When button is clicked.. task created and sent to database*/}
                <button onClick={() => {handleFormClose(); handleSendRequest(); handleAddTask();}} className="button--style">Submit</button>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
        </div>
    )
}