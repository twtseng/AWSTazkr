import { Card,CardContent,Button,CardActions, CardHeader, Modal } from '@material-ui/core';
import React,{useState} from 'react';
import Task from './Task';
import TaskForm from './TaskForm';
import { useDrop } from 'react-dnd';
import {useAppContext} from '../libs/contextLib';

export default ({column, deleteColumn}) => {
    const {socket} = useAppContext();
    const [open,setOpen] = useState(false);

    const [, drop] = useDrop({
        accept: "TASK",
        canDrop: ({fromColumn}) => fromColumn._id !== column._id,
        drop: ({task,fromColumn}) => { 
            socket.emit('moveTask',{task:task,to:column._id,from:fromColumn._id});
        }
    });

    const handleClose = task => {
        setOpen(false);
        socket.emit('addTask',task)
    }

    return (
        <div>
            <Card style={{margin:"1rem"}} ref={drop}>
                <CardHeader title={column.Name}/>
                <CardContent>
                    {column.tasks && column.tasks.map((task) => <Task key={task._id} task={task} column={column}/>)}
                </CardContent>
                <CardActions>
                    <Button style={{margin:"auto"}} size="large" onClick={() => setOpen(true)}>Add Task</Button>
                    <Button style={{margin:"auto"}} size="large" onClick={deleteColumn}>Delete Column</Button>
                </CardActions>
            </Card>
            <Modal open={open} onClose={handleClose}>
                <TaskForm type="Add" taskProp={{name:"",description:"",column:column._id}} handleSubmit={handleClose}/>
            </Modal>
        </div>
    )
}