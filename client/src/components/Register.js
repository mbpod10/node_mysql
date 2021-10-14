import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import "./styles/Login.css"
import axios from 'axios';


const Register = () => {

  const [user_id, setId] = useState(null)
  const [makeCall, setMakeCall] = useState(false)

  const [user, setUser] = useState({
    "email": "",
    "password": "",
    "username": ""
  })

  const [profile, setProfile] = useState({
    // "user_id": null,
    "first_name": "",
    "last_name": "",
    "profile_image": "",
    "profile_description": ""
  })

  const handleUserChange = (event) => {
    console.log(event.target.name, event.target.value)
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleProfileChange = (event) => {
    console.log(event.target.name, event.target.value)
    setProfile({
      ...profile,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    async function makeAPICall() {
      await axios.post(`http://localhost:4001/users/create_user`, user).then((response) => {
        console.log(response.data)
        if (response.data.id) {
          setId(response.data.id)
          setMakeCall(true)
        }
        profile["user_id"] = user_id
      })
    }
    makeAPICall()
  }

  if (makeCall) {
    function createdProfile() {
      axios.post(`http://localhost:4001/users/create_profile`, profile).then((response) => {
        console.log(response.data)
      })
    }
    createdProfile()
  }


  console.log(user_id)
  return (
    <>
      <h1>Register</h1>
      <Container className="login_con">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <FloatingLabel controlId="floatingInput" label="Username" className="mb-3" >
              <Form.Control onChange={handleUserChange} type="username" placeholder="username" name="username" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" >
              <Form.Control onChange={handleUserChange} type="email" placeholder="name@example.com" name="email" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control onChange={handleUserChange} type="password" placeholder="Password" name="password" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel controlId="floatingInput" label="First Name">
              <Form.Control onChange={handleProfileChange} type="first_name" placeholder="First Name" name="first_name" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel controlId="floatingInput" label="Last Name">
              <Form.Control onChange={handleProfileChange} type="last_name" placeholder="Last Name" name="last_name" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel controlId="floatingInput" label="Profile Image">
              <Form.Control onChange={handleProfileChange} type="profile_image" placeholder="Profile Image" name="profile_image" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel controlId="floatingInput" label="Profile Description">
              <Form.Control onChange={handleProfileChange} type="profile_description" placeholder="Profile Description" name="profile_description" />
            </FloatingLabel>
          </Form.Group> <br />
          <Button variant="primary" type="submit" >Register</Button>
        </Form> <br />
        <h3>Log In <Link to="/login">Here</Link></h3>
      </Container>

    </>
  )
}

export default Register