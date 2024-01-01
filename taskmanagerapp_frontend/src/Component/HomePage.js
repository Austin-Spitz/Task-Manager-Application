import React, {useEffect} from "react";
import NavHeader from "./NavHeader";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { TaskAlt } from "@mui/icons-material";

export default function HomePage(){
    
    // handling date component
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // zero-indexed
    const day = currentDate.getDay();
    const year = currentDate.getFullYear();
    const ddmmyy = year+"/"+month+"/"+day

    // useState to handle offCanvas component
    const [show, setShow] = React.useState(false);

    // useState to determine when the api fetch should begin
    const [sendRequest, setSendRequest] = React.useState(false)

    // useState to hold the task object information
    const id = 1;
    const [task, setTask] = React.useState({
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

    // sets the sendRequest to true so that the useEffect can run
    function handleSendRequest(){
        setSendRequest(prevRequest => !prevRequest)
    }

    // useEffect that will POST a new task
    useEffect(() => {
        if(sendRequest){
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
                id=id+1;
            })
            
        }
        
    }, [sendRequest]);

    const handleFormClose = () => setShow(false);
    const handleFormShow = () => setShow(true);

    function handleChange(event){
        const {name, value} = event.target // taking in the name and value

        setTask(prevTask => ({ // setting the meme
            ...prevTask, // using prevTask data, but changing the name to the value
            [name]: value
        }))
    }

    // function that will handle logic in regards to dynamically creating cards
    function handleAddTask(){
        
    }


    return (
        <div>
            <NavHeader/>
            
            <div className="div--card">
                
            

    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Task #{id}</Card.Title>
        <Card.Text>
          {task.taskDescription}
        </Card.Text>
      </Card.Body>
    </Card>

            </div>

            <div>
            <button className="addTaskButton--style" onClick={handleFormShow}>+ Add Task</button>
            </div>



            <Offcanvas show={show} onHide={handleFormClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Task #3</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="form--style">
            <form>
                <label type="text" className="label--style">Task</label> <br/>
                <input type="text" autoComplete="off" placeholder="Your task.." value={task.taskDescription} name="taskDescription" onChange={handleChange}/> <br/>
                <label type="text" className="label--style">Deadline (yyyy/mm/dd)</label> <br/>
                <input type="text" autoComplete="off" placeholder="Task Deadline.." value={task.deadline} name="deadline" onChange={handleChange}/>
                <br/>
                <label type="text" className="label--style">Purpose</label> <br/>
                <select type="text">
                    <option>Work</option>
                    <option>School</option>
                    <option>Personal</option>
                    <option>Health</option>

                </select> <br/>

                <button onClick={() => {handleFormClose(); handleSendRequest(); handleAddTask();}} className="button--style">Submit</button>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
        </div>
    )
}