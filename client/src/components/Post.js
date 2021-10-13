import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const Search = (props) => {
  console.log(props.match)
  const [post, setPost] = useState({})

  useEffect(() => {
    async function makeAPICall() {
      await axios.get(`http://localhost:4001/photos/${props.match.params.id}`).then((response) => {
        console.log(response.data)
        setPost(response.data)
      })
    }
    makeAPICall()
  }, [props.match.params.id])


  return (
    <>
      <h1>Post</h1>
      <Card key={post.index} style={{ width: '50rem' }}>
        <Card.Img key={post.image_url} variant="top" src={post.image_url} />
        <Card.Body>
          <Card.Text className="user_info" key={post.email}>
            <div className="user_image_div">
              <img src={post.profile_image} className="user_image" alt={"profile"} />
            </div>
            <Link className="username" to={`/user/${post.user_id}`}><b>{post.username}</b></Link> {post.caption}
          </Card.Text>
          <Card.Text className="date" key={post.email}>{post.created_at} </Card.Text>

        </Card.Body>
      </Card>
    </>
  )
}

export default Search