import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Users = () => {

  const [userArray, setUserArray] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4001/users').then((data) => {
      setUserArray(data.data)
    })
  }, [])

  const let_array = userArray.map((user, index) => {
    return (
      <div>
        <h3 key={user.email}>{user.email}</h3>
        <h3 key={user.user_id}><Link to={`/user/${user.user_id}`}>{user.user_id}</Link></h3>
        <h3 key={user.password}>{user.password}</h3>
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