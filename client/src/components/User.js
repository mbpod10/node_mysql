import React, { useEffect, useState } from 'react';
import axios from 'axios';


const User = (props) => {
  console.log(props.match.params.id)

  const [user, setUser] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:4001/users/${props.match.params.id}`).then((data) => {
      setUser(data.data)
    })
  }, [props.match.params.id])

  console.log(user)
  return (
    <>
      <h1>ONE USER!</h1>
    </>
  )
}

export default User