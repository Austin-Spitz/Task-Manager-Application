import React from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import HomePage from "./HomePage";


export default function NoTask(){

    const navigate = useNavigate()
    function createNewTask(){
        return (
            navigate('home')
        )
    }

    return (  
    <main>
      <div className="no-notes">
                <h1>You have no tasks to complete</h1>
                <button className="first-task" onClick={createNewTask}>
                    Create Task
                </button>
            </div>
    </main>
    )
}