import React,{useState,useEffect} from 'react'
import {useAppContext} from '../libs/contextLib';

export default ({socket,provider}) => {
    const [popup,setPopup] = useState();
    const {auth,setAuth,user,setUser} = useAppContext();
    useEffect(() => {
        socket.on(provider,resp => {
            setUser(resp);
            setAuth(true);
            console.log(resp);
        });
    },[provider,setAuth,setUser,socket]);

    useEffect(() => {
        user && popup && popup.close();
    },[user,popup]);

    const openPopup = () => {
        const width=600,height=600;
        const left = (window.innerWidth / 2) - (width / 2);
        const top = (window.innerHeight / 2) - (height / 2);
        const url = `http://localhost:8000/auth/${provider}?socketId=${socket.id}`;

        return window.open(url, "", 
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
            scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
            height=${height}, top=${top}, left=${left}`
        );
    }

    const startAuth = e => {
        e.preventDefault();
        setPopup(openPopup());
    }

    return (
        <div>
            {!auth ? <button onClick={e => startAuth(e)}>{provider}</button> : <p>{user.username}</p>}
        </div>
    );
}