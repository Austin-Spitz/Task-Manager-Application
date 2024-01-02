import React, {useEffect} from "react";
import NavHeader from "./NavHeader";
import 'bootstrap/dist/css/bootstrap.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CardC from "./cardC";
import "../style.css";

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


    // useState to hold the task object information
    const [task, setTask] = React.useState({
        id: index,
        date: ddmmyy,
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
        console.log("task before POST request: ", task);
            fetch(`http://localhost:8080/taskManager/add`, {
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

        console.log("Handling change: ", name, value);

        setTask(prevTask => ({ // setting the meme
            ...prevTask, // using prevTask data, but changing the name to the value
            [name]: value
        }))
    }

    // function that will handle logic in regards to dynamically creating cards
    const handleAddTask = () => {
      console.log("Task before update:", task);
  setTasks((prevTasks) => {
    const updatedTasks = [...prevTasks, task];
    console.log("Updated tasks:", updatedTasks);
    return updatedTasks;
  });
    };

    useEffect(() => {
      console.log("Tasks have been updated (useEffect): ", tasks);
    },[tasks])



    console.log("Console log before return statement:")
    console.log(task)
    return (
        <div>
            <NavHeader/>
            
            {/*Dynamically creating cards that hold the task information*/} 
            {tasks.map((task, index) => (
              <CardC key={task.id} task={task} index={index}/>
            ))}
            

           

            <div>
            <button className="addTaskButton--style" onClick={handleFormShow}>+ Add Task</button>
            </div>

            {/*Form logic*/}
            <Offcanvas show={show} onHide={handleFormClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Task #{index+1}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="form--style">
            <form>
                <label type="text" className="label--style">Task</label> <br/>
                <input type="text" autoComplete="off" placeholder="Your task.." value={task.taskDescription} name="taskDescription" onChange={handleChange}/> <br/>
                <label type="text" className="label--style">Deadline (yyyy/mm/dd)</label> <br/>
                <input type="text" autoComplete="off" placeholder="Task Deadline.." value={task.deadline} name="deadline" onChange={handleChange}/>

                {/*When button is clicked.. task created and sent to database*/}
                <button onClick={() => {handleFormClose(); handleSendRequest(); handleAddTask();}} className="button--style">Submit</button>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
        </div>
    )
}