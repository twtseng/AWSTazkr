import React,{useEffect} from 'react';
import {AppBar,Toolbar,Typography} from '@material-ui/core';
import {Link} from '@reach/router';
import {useAppContext} from '../libs/contextLib';

export default () => {
    const {auth,setAuth,user,setUser,socket} = useAppContext();

    const logout = e => {
      e.preventDefault();
      socket.emit('logout',user);
    }

    useEffect(() => {
      socket.on("logout", resp => {
        console.log(`logged out ${resp}`)
        setAuth(false);
        setUser(null);
      })
    },[setAuth,setUser,socket]);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" >
                  <Link style={{color:"white"}} to="/">Tazkr</Link>
                </Typography>
                <Typography variant="h4">
                  <Link style={{color:"white"}} to="/board">Board</Link>
                </Typography>
                <Typography variant="h4">
                  <Link style={{color:"white"}} to="/profile">Profile</Link>
                  {auth ? 
                  <button onClick={logout}>Logout</button>:
                  <Link style={{color:"white"}} to="/login">Login</Link>
                  }
                </Typography>
            </Toolbar>
        </AppBar>
    )
}