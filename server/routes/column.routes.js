const {getAllColumns,getSingleColumn,createColumn,updateColumn,deleteColumn,addTaskToColumn,removeTaskFromColumn,moveTask} = require('../controllers/column.controller');

module.exports = app => {
    app.get('/api/columns', getAllColumns);
    app.get('/api/columns/:id', getSingleColumn);
    app.post('/api/columns/create', createColumn);
    app.put('/api/columns/:id/update', updateColumn);
    app.delete('/api/columns/:id/delete', deleteColumn);
    app.patch('/api/columns/:id/addTask', addTask);
    app.patch('/api/columns/:id/removeTask', removeTask);
    app.patch('/api/columns/moveTask/', moveTask);
}