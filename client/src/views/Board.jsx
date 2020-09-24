import React,{useState,useEffect} from 'react';
import Column from '../components/Column';
import axios from 'axios';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {useAppContext} from '../libs/contextLib';

export default ({id}) => {
    const [board,setBoard] = useState();
    const {socket} = useAppContext();

    const refreshBoard = () => {
        axios.get(`http://localhost:8000/api/boards/${id}`)
        .then(resp => setBoard(resp.data))
        .catch(err => console.log(err));
    }
    
    const addColumn = e => socket.emit('addColumn',{board:id});
    const deleteColumn = column => socket.emit('delColumn',{id:column._id});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/boards/${id}`)
        .then(response => {
            setBoard(response.data);
            socket.on('addColumn', resp => refreshBoard());
            socket.on('delColumn', resp => refreshBoard());
            socket.on('moveTask',resp => refreshBoard());
            socket.on('addTask', resp => refreshBoard());
            socket.on('updateTask', resp => refreshBoard());
        }).catch(err => console.log(err));
    },[id,socket]);

    return (
        <DndProvider backend={HTML5Backend}>
            <h1>Board</h1>
            <button onClick={addColumn}>Add Column</button>
            <div style={{display:"flex",padding:20}}>
                {board && board.columns.map((column) => <Column key={column._id} column={column} deleteColumn={() => deleteColumn(column)}/>)}
            </div>
        </DndProvider>
    )
}