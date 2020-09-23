import { Card,CardContent,Button,CardActions, CardHeader } from '@material-ui/core';
import React from 'react';
import Task from './Task';
import axios from 'axios';
import { useDrop } from 'react-dnd';

export default ({column, deleteColumn, refreshBoard}) => {
    const moveTask = (taskToMove, fromColumn) => {
        axios.patch(`http://localhost:8000/api/columns/moveTask/${taskToMove._id}/${fromColumn._id}/${column._id}`,{})
        .then(resp => refreshBoard())
        .catch(err => console.log(err));
    }
    const addNewTask = () => {
        axios.patch(`http://localhost:8000/api/columns/${column._id}/addTaskToColumn`,{ Name: "New Task", description: "New task description"})
        .then(resp => refreshBoard())
        .catch(err => console.log(err));
    }
    const [, drop] = useDrop({
        accept: "TASK",
        canDrop: (props) => props.fromColumn._id !== column._id,
        drop: (props) => { 
            moveTask(props.task, props.fromColumn);
        },
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
      })

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