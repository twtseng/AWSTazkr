import { Card,CardContent,Button,CardActions, CardHeader } from '@material-ui/core';
import React from 'react';
import Task from './Task';
import { useDrop } from 'react-dnd';
import {useAppContext} from '../libs/contextLib';

export default ({column, deleteColumn}) => {
    const {socket} = useAppContext();

    const addNewTask = e => socket.emit('addTask',{Name:"New Task",description:"New task description",column:column._id});

    const [, drop] = useDrop({
        accept: "TASK",
        canDrop: ({fromColumn}) => fromColumn._id !== column._id,
        drop: ({task,fromColumn}) => { 
            socket.emit('moveTask',{task:task,to:column._id,from:fromColumn._id});
        }
    });

    return (
        <Card style={{margin:"1rem"}} ref={drop}>
            <CardHeader title={column.Name}/>
            <CardContent>
                {column.tasks && column.tasks.map((task) => <Task key={task._id} task={task} column={column}/>)}
            </CardContent>
            <CardActions>
                <Button style={{margin:"auto"}} size="large" onClick={addNewTask}>Add Task</Button>
                <Button style={{margin:"auto"}} size="large" onClick={deleteColumn}>Delete Column</Button>
            </CardActions>
        </Card>
    )
}