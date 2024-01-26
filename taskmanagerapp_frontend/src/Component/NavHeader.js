import React from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";

export default function NavHeader(){

    // handling date component
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // zero-indexed
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    const navigate = useNavigate();

    function handleSignOut(){
        navigate("../login")
    }


    return (
        <nav className="nav--container">
            <h2 className="nav--title">Task Manager App</h2>
            <h3 className="nav--date">{month}/{day}/{year}</h3>
            <i class="bi bi-box-arrow-right signOutIcon" onClick={handleSignOut}></i>
        </nav>
    )
}