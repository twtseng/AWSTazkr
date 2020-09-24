import React from 'react';
import {AppBar,Toolbar,Typography} from '@material-ui/core';
import {Link} from '@reach/router';
import {useAppContext} from '../libs/contextLib';

export default props => {
    const {auth} = useAppContext();

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
                  <Link style={{color:"white"}} to="/login">Logout</Link>//TODO create logout function
                  :
                  <Link style={{color:"white"}} to="/login">Login</Link>
                  }
                </Typography>
            </Toolbar>
        </AppBar>
    )
}