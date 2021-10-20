import React, { useEffect, useState } from 'react';
import './App.css';
import Users from "./components/Users"
import User from "./components/User"
import Home from './components/Home';
import { Switch, Route } from "react-router-dom";
import Navbar from './components/NavBar';
import Search from './components/Search';
import Post from './components/Post';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import { useHistory } from 'react-router-dom';

function App(props) {
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState("NOT_LOGGED_IN")

  const setGlobalUser = (data) => {
    setUser(data.user)
    setLoggedIn(data.msg)
    history.push(`/user/${data.user.id}`)
  }

  const [query, setQuery] = useState("")
  const history = useHistory();
  const getQuery = (data) => {
    setQuery(data)
    history.push(`/search/${data}`)
  }
  console.log("APP.js user", user)
  console.log("APP.js user", loggedIn)

  return (
    <Switch>
      <div className="App">
        <Navbar getQuery={getQuery} user={user} loggedIn={loggedIn} />
        <Route exact path="/" render={(props) => (<Home />)} />
        <Route path="/users" render={(props) => (<Users />)} />

        <Route path="/login" render={(props) =>
        (<Login {...props} setGlobalUser={setGlobalUser}
        />)} />
        <Route path="/create_post" render={(props) =>
        (<CreatePost {...props} user={user}
        />)} />

        <Route path="/register" render={(props) => (<Register />)} />
        <Route path="/user/:id" render={(props) => (<User {...props} />)} />
        <Route path="/post/:id" render={(props) => (<Post {...props} />)} />
        <Route path="/search/:query" render={(props) => (<Search {...props} query={query} />)} />
      </div>
    </Switch>
  );
}

export default App;
