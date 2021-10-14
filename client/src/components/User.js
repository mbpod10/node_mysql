import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import "./styles/User.css"



const User = (props) => {
  const [user, setUser] = useState({})
  const [activityArray, setActivityArray] = useState([])

  useEffect(() => {
    async function makeAPICall() {
      await axios.get(`http://localhost:4001/users/${props.match.params.id}`).then((response) => {
        setUser(response.data)
      })
    }
    makeAPICall()
  }, [props.match.params.id])

  useEffect(() => {
    if (user.comments && user.posts) {
      setActivityArray(user.comments.concat(user.posts))
    } else if (user.posts) {
      setActivityArray(user.posts)
    } else if (user.comments) {
      setActivityArray(user.comments)
    }
  }, [user.comments, user.posts])


  let returnActiviyArray = activityArray.map((element, index) => {
    if (element.content) {
      return (
        <>
          <h6 className="username">
            {user.username} commented on
            <Link to={`/user/${element.id}`}>{element.username}</Link>'s
            <Link to={`/post/${element.photo_id}`}> post</Link> on {element.created_at}
          </h6>
        </>
      )
    }
    else {
      return (
        <>
          <h6 className="username">{user.username} posted a
            <Link to={`/post/${element.image_id}`}> photo</Link> on {element.created_at}</h6>
        </>
      )
    }
  })

  return (
    <>
      <Container className="t">
        <h1 className="username"> {user.username}</h1>
        <h4 className="username">Created: {user.user_created}</h4>
      </Container>
      <Container>
        <h3 className="username">{user.first_name} {user.last_name}</h3>
      </Container>
      <Container className="greybox">
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
        {user.username}
      </div>
      <Container>
        <h4 className="username">Recent Activity</h4>
        {returnActiviyArray}
      </Container>
    </>
  )
}

export default User