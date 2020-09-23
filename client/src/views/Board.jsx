import React,{useState,useEffect} from 'react';
import Column from '../components/Column';
import axios from 'axios';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import io from 'socket.io-client'
const socket = io("http://localhost:8000");

export default ({id}) => {
    const [board,setBoard] = useState({});
    const refreshBoard = () => {
        axios.get(`http://localhost:8000/api/boards/${id}`)
        .then(resp => {
            console.log(resp.data);
            setBoard(resp.data);
        })
        .catch(err => console.log(err));
    }

    const addColumn = e => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/boards/${id}/addColumnToBoard`,{
            name:"Name",
            locked:false,
            tasks:[],
            board: id
        })
        .catch(err => console.log(err));
    }

    const deleteColumn = column => {
        axios.delete(`http://localhost:8000/api/columns/${column._id}/delete`,column)
        .catch(err => console.log(err));
    }

    useEffect(() => {
        refreshBoard();
        socket.on('addColumn', resp => {
            refreshBoard();
        })
        socket.on('delColumn', resp => {
            refreshBoard();
        })
        socket.on('moveTask',resp => {
            refreshBoard();
        });
        socket.on('addTask', resp => {
            refreshBoard();
        })
    },[]);

    return (
        <DndProvider backend={HTML5Backend}>
            <h1>Board</h1>
            <button onClick={addColumn}>Add Column</button>
            <div style={{display:"flex",padding:20}}>
                {board.columns && board.columns.map((column) => <Column key={column._id} column={column} refreshBoard={refreshBoard} deleteColumn={() => deleteColumn(column)}/>)}
            </div>
        </DndProvider>
    )
}