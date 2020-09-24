import React from 'react';
import io from 'socket.io-client';
import OAuth from '../components/OAuth';
import {useAppContext} from '../libs/contextLib';
const socket = io("http://localhost:8000");
const providers = ['twitter', 'google', 'facebook', 'github'];

export default props => {
    const {auth,user} = useAppContext();
    return (
        <div>
            {auth ? <p>{user.username}</p> : providers.map(provider => <OAuth provider={provider} key={provider} socket={socket}/>)}
        </div>
    );
}