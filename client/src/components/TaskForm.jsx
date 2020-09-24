import React,{useState} from 'react';
import { Card, CardContent, Typography, FormControl, InputLabel, Input, TextField, Select, MenuItem, CardHeader, Button} from '@material-ui/core';
import {useAppContext} from '../libs/contextLib';

export default ({taskProp,close}) => {
    const {socket} = useAppContext();
    const [task,setTask] = useState(taskProp);

    const modalStyle = {
        margin: "3rem",
        width: 400,
        height: 400,
        position: "absolute",
        top: (window.innerHeight / 2) - 250,
        left: (window.innerWidth / 2) - 200,
        padding: 20,
        textAlign:"center"
    }

    const handleSubmit = e => {
        e.preventDefault();
        socket.emit('updateTask',task)
        close();
    }
    return (
        <Card style={modalStyle}>
            <CardHeader title={"Update Task"}/>
            <CardContent>
                    <FormControl style={{display:"block",margin:20,textAlign:"left"}}>
                        <InputLabel htmlFor="taskName">Task name</InputLabel>
                        <Input value={task.Name} id="taskName" onChange={e => setTask({...task,['Name']:e.target.value})}/>
                    </FormControl>
                    <FormControl style={{display:"block",margin:20,textAlign:"left"}}>
                        <InputLabel htmlFor="taskDesc">Task description</InputLabel>
                        <Input value={task.description} id="taskDesc" onChange={e => setTask({...task,['description']:e.target.value})}/>
                    </FormControl>
                {/* <FormControl style={{display:"block",margin:20,textAlign:"left"}}>
                    <InputLabel id="taskPriority">Task priority</InputLabel>
                    <Select select label="taskPriority" value={task.}>
                        <MenuItem value={1}>{1}</MenuItem>
                        <MenuItem value={2}>{2}</MenuItem>
                    </Select>
                </FormControl> */}
            </CardContent>
            <Button onClick={handleSubmit}>Update</Button>
        </Card>
    )
}