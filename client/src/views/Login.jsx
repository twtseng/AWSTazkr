import React from 'react';
import OAuth from '../components/OAuth';
import {useAppContext} from '../libs/contextLib';
const providers = ['twitter', 'google', 'facebook', 'github'];

export default props => {
    const {auth,user,socket} = useAppContext();
    return (
        <div>
            {auth ? <p>{user.username}</p> : providers.map(provider => <OAuth provider={provider} key={provider} socket={socket}/>)}
        </div>
    );
}