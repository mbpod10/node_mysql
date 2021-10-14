import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { LinkContainer } from 'react-router-bootstrap'
import './styles/Navbar.css'


const Navibar = (props) => {

  const [query, setQuery] = useState("")

  const onSubmit = (event) => {
    event.preventDefault()
    props.getQuery(query)
  }

  const onChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand>JoynUs</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/users">
              <Nav.Link>Users</Nav.Link>
            </LinkContainer>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Nav>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
                onChange={onChange}
              />
              <Button onClick={onSubmit} variant="outline-success">Search</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Navibar