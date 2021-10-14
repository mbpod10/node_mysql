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
import { useHistory } from 'react-router-dom';

function App(props) {

  const [query, setQuery] = useState("")
  const history = useHistory();
  const getQuery = (data) => {
    setQuery(data)
    history.push(`/search/${data}`)
  }

  return (
    <Switch>
      <div className="App">
        <Navbar getQuery={getQuery} />
        <Route exact path="/" render={(props) => (<Home />)} />
        <Route path="/users" render={(props) => (<Users />)} />
        <Route path="/login" render={(props) => (<Login />)} />
        <Route path="/register" render={(props) => (<Register />)} />
        <Route path="/user/:id" render={(props) => (<User {...props} />)} />
        <Route path="/post/:id" render={(props) => (<Post {...props} />)} />
        <Route path="/search/:query" render={(props) => (<Search {...props} query={query} />)} />
      </div>
    </Switch>
  );
}

export default App;
