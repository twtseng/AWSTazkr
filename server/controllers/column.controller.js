const { Column } = require('../models/column.model');
const { Task } = require('../models/task.model');

const handleResponse = (err,result,resp) => err ? resp.status(400).json(err) : resp.json(result);

module.exports = {
    createColumn : async (req,resp) => {
        await Column.create(req.body, (err,result) => handleResponse(err,result,resp));
    },
    getAllColumns : async (req,resp) => {
        await Column.find({}, (err,result) => handleResponse(err,result,resp));
    },
    getSingleColumn : async (req,resp) => {
        await Column.findOne({_id:req.params.id}, (err,result) => handleResponse(err,result,resp))
        .populate('tasks');
    },
    updateColumn : async (req,resp) => {
        await Column.findOneAndUpdate({_id:req.params.id}, req.body, {new:true,runValidators:true}, (err,result) => handleResponse(err,result,resp));
    },
    deleteColumn : async (req,resp) => {
        await Column.findOneAndDelete({_id:req.params.id}, (err,result) => handleResponse(err,result,resp));
        const io = req.app.get('io');
        io.emit('delColumn');
    },
    addTask : async (req,resp) => {
        const newTask = await Task.create(req.body);
        await Column.findOneAndUpdate({_id:req.params.id}, {$push:{tasks:newTask}}, {new:true}).exec((err,result) => handleResponse(err,result,resp));
        const io = req.app.get('io');
        io.emit('addTask');
    },
    moveTask : async (req,resp) => {
        const oldCol = await Column.findOneAndUpdate({_id:req.body.fromcolumnid}, {$pull:{tasks:req.body.taskid}});
        const newCol = await Column.findOneAndUpdate({_id:req.body.tocolumnid}, {$push:{tasks:req.body.taskid}}, {new:true}).exec((err,result) => handleResponse(err,result,resp));
        const io = req.app.get('io');
        io.emit('moveTask');
    }
}