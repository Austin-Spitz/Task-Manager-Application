import React, {useEffect} from "react";
import { Card } from "react-bootstrap";
import "../style.css";
import { useNavigate } from "react-router-dom";

export default function CardC({task, index, tasks}){

    const navigate = useNavigate()

    const [sendRequest, setSendRequest] = React.useState(false)

    function handleDeleteTask(){
        setSendRequest(prevRequest => !prevRequest)
    }


    // useEffect that will DELETE a task
    useEffect(() => {
        if(sendRequest){
              fetch(`http://localhost:8080/taskManager/delete/${task.id}`, {
                  method: "DELETE",
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
                  if(tasks.length-1 != 0){
                    window.location.reload();
                  }
                  else{
                    navigate('/')
                  }
              })
              
            }
          
      }, [sendRequest]);


      function getPriority(priority){
        switch(priority){
          case 'High':
            return 'red';
          case 'Medium':
            return 'yellow';
          case 'Low':
            return 'green';
          default:
            return 'red';
        }
      }


    return (
        <div className="div--card">
            <Card style={{ width: '18rem' }} className="card--container">
      <Card.Body>
      <i class="bi bi-circle-fill" style={{'color': getPriority(task.priority)}}></i>
        <Card.Title className="card-title">Task #{index+1} <i class="bi bi-trash-fill" onClick={handleDeleteTask}></i></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Due: {task.deadline}</Card.Subtitle>
        <Card.Text>
          {task.taskDescription}
        </Card.Text>
      </Card.Body>
    </Card>
        </div>
    )
}