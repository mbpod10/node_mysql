import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Search = (props) => {
  console.log(props.match)
  const [searchArray, setSearchArray] = useState([])

  useEffect(() => {
    async function makeAPICall() {
      await axios.get(`http://localhost:4001/users/search/${props.match.params.query}`).then((response) => {
        console.log(response.data)
        setSearchArray(response.data)
      })
    }
    makeAPICall()
  }, [props.match.params.query])

  const returnArray = searchArray.map((element, index) => {
    return (
      <>
        <h5>{element.username}</h5>
        <h5>
          <Link className='link_' to={`/user/${element.id}`}>{element.email}</Link>
        </h5>
        <hr />
      </>
    )
  })

  return (
    <>
      <h1>User Search For '{props.match.params.query}'</h1>
      <hr />
      {
        returnArray ? returnArray : <h1>No Search Results</h1>

      }

    </>
  )
}

export default Search