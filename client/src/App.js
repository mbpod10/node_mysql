import './App.css';
import Users from "./components/Users"
import User from "./components/User"
import Home from './components/Home';
import { Switch, Route } from "react-router-dom";
import Navbar from './components/NavBar';




function App() {

  return (
    <Switch>
      <div className="App">
        <Navbar />
        <Route exact path="/" render={(props) => (<Home />)} />
        <Route path="/users" render={(props) => (<Users />)} />
        <Route path="/user/:id" render={(props) => (<User {...props} />)} />
      </div>
    </Switch>
  );
}

export default App;
