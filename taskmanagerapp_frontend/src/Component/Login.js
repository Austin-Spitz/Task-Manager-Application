import { TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Http } from "@mui/icons-material";
import { red } from "@mui/material/colors";

export default function Login(){

    const [account, setAccount] = React.useState({
        username: "",
        password: ""
    })

    // function that handles logging in with empty fields
    function handleEmptyFields(){
      if(account.email === "" || account.password === ""){
        console.log("Enter data!!!")
        setSendRequest(prevRequest => !prevRequest);
      }
    }

    const navigate = useNavigate();

    const [visibility, setVisibility] = React.useState("hidden"); // login feedback NOT visible by default

    const [sendRequest, setSendRequest] = React.useState(false);

    // useEffect that will DELETE a task
    useEffect(() => {
        if (sendRequest) {
          const response = fetch(`http://localhost:8080/taskManager/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(account),
          })
            .then((response) => response.json())
            .then((actualData) => {
              console.log(actualData);
              // Check the status inside this block
              console.log("response status: ", actualData.message)
              if (actualData.message === "Login Success") {
                navigate('noTask');
              } else {
                handleVisibility();
                // Handle other cases if needed
              }
            })
            .catch((err) => {
              console.log(err.message);
              // Handle error cases
            })
            .finally(() => {
              setSendRequest(false);
            });
        }
      }, [sendRequest]);
      

    // useState to determine when the api fetch should begin
    function handleSendRequest(){
      setSendRequest(prevRequest => !prevRequest)
    }

    // when the login is unsuccessful (wrong email or password input) then the visibility should change
    function handleVisibility(){
      setVisibility(prevVisibility => !prevVisibility);
    }

    function navigateCreateAccount(){
        return (
            navigate('../createAccount')
        )
    }

    function handleChange(event){
        const {name, value} = event.target // taking in the name and value

        setAccount(prevUser => ({ // setting the user
            ...prevUser, // using prevUsers data, but changing the name to the value
            [name]: value
        }))
    }
    return (
        <div className="login--container">
            <div className="tst">
            <h2 className="signIn--h2">Sign In</h2>
            <p style={{'visibility': visibility, 'color': 'red'}}>Login Failed. Try again</p>
            <TextField className="login-text-style" placeholder="Username" id="outlined-multiline-static" value={account.username} name = "username" onChange={handleChange} autoComplete="off"></TextField> <br/>
            <TextField className="login-text-style" placeholder="Password" id="outlined-password-input" type="password" value={account.password} name="password" onChange={handleChange} autoComplete="off"></TextField> <br/>
            <button className="login-button--style" onClick={() => {handleEmptyFields(); handleSendRequest();}}>Login</button> <br/>
            <button className="newAccount-button--style" onClick={navigateCreateAccount}>Create account</button>
            </div>
            
            </div>
    )
}