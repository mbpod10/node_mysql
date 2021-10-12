import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import "./styles/Users.css"
import Button from 'react-bootstrap/Button';
import './styles/Home.css'

const Users = () => {

  const [userArray, setUserArray] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4001/users/profiles').then((data) => {
      setUserArray(data.data)
    })
  }, [])

  const let_array = userArray.map((user, index) => {
    return (
      <>
        <div key={user.first_name} className="user_container">
          <div className="user_image_div">
            <img src={user.profile_image} className="user_image" alt={"profile"} />
          </div>
          <div className="info">
            <h3 key={user.email}>{user.email}</h3>
            <FontAwesomeIcon icon={faEnvelope} />
            <h3 key={user.user_id}><Link className='link_' to={`/user/${user.user_id}`}>{user.first_name} {user.last_name}</Link></h3>
          </div>
        </div>
        <Button variant="primary">Primary</Button>{' '}
      </>
    )
  })

  return (
    <>
      <h2>User List</h2>
      {let_array}
    </>
  )
}

export default Users