import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Axios from "axios";
import { UserContext } from "../context/UserContext";


function Login() {
  const userContext = useContext(UserContext);
 
  const navigate = useNavigate();



  const handleOnSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3002/login", {
      email: userContext.email,
      password: userContext.password,
    }).then((response) => {
     
      if (response.data.message) {
        userContext.setIsLogin(response.data.message);
       
        navigate("/redirect");
      } else  {
        userContext.setIsLogin(response.data[0]);
        const user = response.data[0]
        
         localStorage.setItem('user', JSON.stringify(user));
                  
          navigate("/redirect");
          
      }
    });
  };
  return (
    <>
      <div className="App">
        <header className="App-header">
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => {
                  userContext.setIsEmail(e.target.value);
                }}
                type="email"
                autocomplete="on"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => {
                  userContext.setIsPassword(e.target.value);
                }}
                type="password"
                autocomplete="on"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </header>
      </div>
    </>
  );
}

export default Login;
