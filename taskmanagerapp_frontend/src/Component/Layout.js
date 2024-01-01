import { Avatar, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


{/* <Card className="card--style">
                <CardContent>
                    <Typography>
                        <EditIcon></EditIcon>
                        <DeleteIcon/>
                    </Typography>
                    <Typography>
                        <h2>Go to the store</h2>
                    </Typography>

                </CardContent>
            </Card>
            <Card className="card--style">
                <CardContent>
                    <Typography>
                        <EditIcon></EditIcon>
                        <DeleteIcon/>
                    </Typography>
                    <Typography>
                        <h2>Call my doctor</h2>
                    </Typography>

                </CardContent>
            </Card>
            <Card className="card--style">
                <CardContent>
                    <Typography>
                        <EditIcon></EditIcon>
                        <DeleteIcon/>
                    </Typography>
                    <Typography>
                        <h2>Get some money</h2>
                    </Typography>

                </CardContent>
            </Card> */}


            


export default function Layout(){


    // useState to hold the task object information
    const [task, setTask] = React.useState({
        id: 0,
        date: "",
        deadline: "",
        taskDescription: ""
    })

    // useState to determine when the api fetch should begin
    const [sendRequest, setSendRequest] = React.useState(false)


    function handleTaskChange(event){
        const {name, value} = event.target

        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }))
    }
    
    // sets the sendRequest to true so that the useEffect can run
    function handleSendRequest(){
        setSendRequest(prevRequest => !sendRequest)
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
                    })
                    
                }
                
            }, [sendRequest]);

            


    return (
        <div>

            {/* <div className="layout--container">
            <input type="text" placeholder="Task Description" value={task.taskDescription || ""} name="taskDescription" onChange={handleTaskChange}/>
            <button onClick={handleSendRequest}>Add task</button>
            </div> */}

            
        </div>
    )
}