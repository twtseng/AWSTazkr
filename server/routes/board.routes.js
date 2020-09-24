const {getAllBoards,getSingleBoard,createBoard,updateBoard,deleteBoard,addColumnToBoard} = require('../controllers/board.controller');

module.exports = app => {
    app.get('/api/boards', getAllBoards);
    app.get('/api/boards/:id', getSingleBoard);
    app.post('/api/boards/create', createBoard);
    app.put('/api/boards/:id/update', updateBoard);
    app.delete('/api/boards/:id/delete', deleteBoard);
    //app.patch('/api/boards/:id/addColumnToBoard', addColumnToBoard);
}