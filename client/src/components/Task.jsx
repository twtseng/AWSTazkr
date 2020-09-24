import { Card, CardContent, Typography, Modal} from '@material-ui/core';
import React,{useState} from 'react';
import { useDrag } from 'react-dnd';
import TaskForm from './TaskForm';
import {useAppContext} from '../libs/contextLib';

export default ({task, column}) => {
    const {socket} = useAppContext();
    const [open,setOpen] = useState(false);
    const [, drag] = useDrag({
        item: { 
            type: "TASK", 
            task: task,
            fromColumn: column,
        }
    });

    const handleClose = task => {
        setOpen(false);
        socket.emit('updateTask',task);
    }

    return (
        <div>
            <Card onClick={() => setOpen(true)} style={{margin:"1rem",minWidth:200}} ref={drag}>
                <CardContent>
                    <Typography variant="h5" component="p">
                        {task.Name}
                    </Typography>
                </CardContent>
            </Card>
            <Modal open={open} onClose={handleClose}>
                <TaskForm type="Update" taskProp={task} handleSubmit={handleClose}/>
            </Modal>
        </div>
        
    )
}