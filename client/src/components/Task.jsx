import { Card, CardContent, Typography, Modal} from '@material-ui/core';
import React,{useState} from 'react';
import { useDrag } from 'react-dnd';
import TaskForm from './TaskForm';

export default ({task, column}) => {
    const [open,setOpen] = useState(false);
    const [, drag] = useDrag({
        item: { 
            type: "TASK", 
            task: task,
            fromColumn: column,
        }
    });

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Card onClick={handleOpen} style={{margin:"1rem",minWidth:200}} ref={drag}>
                <CardContent>
                    <Typography variant="h5" component="p">
                        {task.Name}
                    </Typography>
                </CardContent>
            </Card>
            <Modal open={open} onClose={handleClose}>
                <TaskForm taskProp={task} close={handleClose}/>
            </Modal>
        </div>
        
    )
}