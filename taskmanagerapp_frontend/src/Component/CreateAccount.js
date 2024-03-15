import { TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CreateAccount(){

    const navigate = useNavigate();

    const [sendRequest, setSendRequest] = React.useState(false);

    // useState object for creating the account
    const [createAccount, setCreateAccount] = React.useState({
        
        customer_Fname: "",
        customer_Lname: "",
        email: "",
        username: "",
        password:""
    })

    // useState to determine when the api fetch should begin
    function handleSendRequest(){
      setSendRequest(prevRequest => !prevRequest)
    }

    function navigateSignUp(){
        return (
            navigate('/')
        )
    }

    function handleChange(event){
        const {name, value} = event.target // taking in the name and value

        setCreateAccount(prevUser => ({ // setting the user
            ...prevUser, // using prevUsers data, but changing the name to the value
            [name]: value
        }))
    }

     // useEffect that will CREATE an account
     useEffect(() => {
        if(sendRequest){
              fetch(`http://localhost:8080/taskManager/save`, { // fetching the backend save function
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(createAccount),
              })
              .then((response) => response.json())
              .then((actualData) => console.log(actualData))
              .catch((err) => {
                  console.log(err.message);
              })
              .finally(() => {
                setSendRequest(false)
                  navigate('/')
              })
              
            }
          
      }, [sendRequest]);

    return (
        <div className="login--container">
            <div className="tst">
            <h2 className="signUp--h2">Sign Up</h2>
            <div className="textField-style2">
            <TextField className="signUp-text-style dd" placeholder="First name" id="outlined-multiline-static" value={createAccount.customer_Fname} name="customer_Fname" onChange={handleChange}></TextField> <br/>
            <TextField className="signUp-text-style" placeholder="Last name" id="outlined-multiline-static" value={createAccount.customer_Lname} name="customer_Lname" onChange={handleChange}></TextField> <br/>
            </div>
            <br/>
            <TextField className="signUp-text-style emailPasswordStyle" placeholder="email" id="outlined-multiline-static" autoComplete="off" value={createAccount.email} name="email" onChange={handleChange}></TextField> <br/>
            <TextField className="signUp-text-style emailPasswordStyle" placeholder="Username" id="outlined-multiline-static" value={createAccount.username} name="username" onChange={handleChange}></TextField> <br/>
            <TextField className="signUp-text-style emailPasswordStyle" placeholder="Password" id="outlined-password-input" type="password" value={createAccount.password} name="password" onChange={handleChange}></TextField> <br/>
            <button className="signUp-button--style" onClick={handleSendRequest}>Sign Up</button>
            </div>
            
            </div>
    )
}