import React,{useState} from 'react';
import {Router} from '@reach/router';
import Board from './views/Board';
import Login from './views/Login';
import Profile from './views/Profile';
import Home from './views/Home';
import Navbar from './components/Navbar';
import {AppContext} from './libs/contextLib';
import io from 'socket.io-client';
import './App.css';
const socket = io("http://localhost:8000");

export default () => {
  const [auth,setAuth] = useState(false);
  const [user,setUser] = useState(null);
  return (
    <div className="App">
      <AppContext.Provider value={{auth,setAuth,user,setUser,socket}}>
        <Navbar />
        <Router>
          <Home path="/"/>
          <Login path="/login"/>
          <Profile path="/profile/:id"/>
          <Board path="/board/:id"/>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

