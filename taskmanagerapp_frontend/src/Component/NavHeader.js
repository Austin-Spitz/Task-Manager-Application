import React from "react";
import {userIcon} from "../images/userIcon.jpg"
import sample from "../images/sample_user.png"
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function NavHeader(){

    // handling date component
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // zero-indexed
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    const firstName= "Austin"

    return (
        <div className="nav--container">
            <Avatar sx={{width: 25, height: 25}}>{firstName.charAt(0)}</Avatar>
            <h2 className="nav--name">Hello, {firstName}</h2>
            <h3 className="nav--date">{month}/{day}/{year}</h3>
        </div>
    )
}