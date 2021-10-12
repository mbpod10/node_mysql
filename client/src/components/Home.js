import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CommentsByPost from './CommentByPost';

const Home = () => {

  const [photoArray, setPhotoArray] = useState([])


  useEffect(() => {
    async function makeAPICall() {
      await axios.get('http://localhost:4001/photos/home_photos').then((response) => {
        console.log(response.data)
        setPhotoArray(response.data)
      })

    }
    makeAPICall()
  }, [])



  const return_array = photoArray.map((element, index) => {
    return (
      <>
        <Card key={element.index} style={{ width: '50rem' }}>
          <Card.Img key={element.image_url} variant="top" src={element.image_url} />
          <Card.Body>
            <Card.Text className="user_info" key={element.email}>
              <div className="user_image_div">
                <img src={element.profile_image} className="user_image" alt={"profile"} />
              </div>
              <Link className="username" to={`/user/${element.user_id}`}><b>@{element.username}</b></Link> {element.caption}
            </Card.Text>
            <Card.Text className="date" key={element.email}>{element.created_at} </Card.Text>
            {element.comments === 0 ?
              <Card.Text key={element.email}>{element.comments} No Comments </Card.Text>
              :
              <Card.Text key={element.index} >{element.comments} Comment(s) </Card.Text>}
          </Card.Body>
        </Card>
      </>
    )
  })

  return (
    <>
      <h1>JoynUs</h1>
      <div className="card-container">
        {return_array}
      </div>
    </>
  )
}

export default Home