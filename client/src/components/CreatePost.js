import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

const CreatePost = (props) => {

  const [post, setPost] = useState({
    "image_url": "",
    "user_id": props.user.id,
    "caption": ""
  })

  const handleChange = (event) => {
    // console.log(event.target.name, event.target.value)
    setPost({
      ...post,
      [event.target.name]: event.target.value
    })
  }
  // console.log(post)
  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post(`http://localhost:4001/photos/create_photo`, post).then((response) => {
      console.log(response.data)
    })
  }
  return (
    <>
      <h1>Create Post</h1>
      <Container className="login_con">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
            <Form.Label>Image Url</Form.Label>
            <Form.Control type="text" placeholder="Image Url" name="image_url" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Caption</Form.Label>
            <Form.Control type="text" placeholder="Post Caption" name="caption" onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Post
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default CreatePost