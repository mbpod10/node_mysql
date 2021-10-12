import React, { useEffect, useState } from 'react';
import "./styles/User.css"
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';


const User = (props) => {
  const [user, setUser] = useState({})
  useEffect(() => {
    async function makeAPICall() {
      await axios.get(`http://localhost:4001/users/${props.match.params.id}`).then((response) => {
        setUser(response.data)
      })
    }
    makeAPICall()
  }, [props.match.params.id])

  console.log(user)
  return (
    <>
      <h1>{user.first_name} {user.last_name}</h1>
      <Container>
        <div className="user_image_div-">
          <img src={user.profile_image} className="user_image-" alt={"profile"} />
        </div>
        <div className="black-line">
          {user.profile_description}
        </div>
        <div className="userPosts">
          <h1>{user.post_count} Posts</h1>
          <h1>{user.comment_count} Comments</h1>
        </div>
      </Container>
      <div>
        {user.email}
        {user.user_created}
        {user.birthday}
      </div>
    </>
  )
}

export default User