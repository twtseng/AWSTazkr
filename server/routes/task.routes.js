const {getAllTasks,getSingleTask,createTask,updateTask,deleteTask,addToTask} = require('../controllers/task.controller');

module.exports = app => {
    app.get('/api/tasks', getAllTasks);
    app.get('/api/tasks/:id', getSingleTask);
    app.post('/api/tasks/create', createTask);
    app.put('/api/tasks/:id/update', updateTask);
    app.delete('/api/tasks/:id/delete', deleteTask);
    //app.patch('/api/tasks/:id/add', addToTask);
}