import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import "./styles/Login.css"
import axios from 'axios';


const Login = (props) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({
    "email": "",
    "password": ""
  })

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    async function makeAPICall() {
      await axios.post(`http://localhost:4001/users/login`, user).then((response) => {
        // console.log(response.data)
        if (response.data.msg === "LOGGED_IN") {
          setLoggedIn(true)
          props.setGlobalUser(response.data)
        }

      })
    }
    makeAPICall()
  }

  return (
    <>
      <h1>Login</h1>
      <Container className="login_con">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control onChange={handleChange} type="email" placeholder="Enter email" name="email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="label">Password</Form.Label>
            <Form.Control onChange={handleChange} type="password" placeholder="Password" name="password" />
          </Form.Group>
          <Button variant="primary" type="submit" >
            Log In
          </Button>
        </Form> <br />
        {
          loggedIn ? <p>{user.email} logged in!</p> : null
        }
        <h6>Sign Up <Link to="/register">Here</Link></h6>
      </Container>

    </>
  )
}

export default Login