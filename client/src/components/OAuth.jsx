import React,{useState,useEffect} from 'react'
export default ({socket,provider}) => {
    const [user,setUser] = useState();
    const [popup,setPopup] = useState();

    useEffect(() => {
        socket.on(provider,resp => {
            setUser(resp);
            console.log(resp);
        });
    },[]);

    useEffect(() => {
        user && popup.close();
    },[user]);

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
            {!user ? <button onClick={e => startAuth(e)}>{provider}</button> : <p>{user.username}</p>}
        </div>
    );
}