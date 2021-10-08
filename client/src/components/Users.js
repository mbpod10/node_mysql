import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import ReactRoundedImage from "react-rounded-image";
import "./styles/Users.css"

const Users = () => {

  const [userArray, setUserArray] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4001/users/profiles').then((data) => {
      setUserArray(data.data)
      // console.log(data.data)
    })
  }, [])

  const let_array = userArray.map((user, index) => {
    return (
      <div key={user.first_name} className="user_container">
        <div className="user_image_div">
          <img src={user.profile_image} className="user_image" alt={"profile"} />
        </div>
        <div>
          <h3 key={user.email}>{user.email}</h3>
          <h3 key={user.user_id}><Link to={`/user/${user.user_id}`}>{user.first_name} {user.last_name}</Link></h3>
        </div>
      </div>
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