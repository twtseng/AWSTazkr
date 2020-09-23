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
    },
    addTaskToColumn : async (req,resp) => {
        const newTask = await Task.create(req.body);
        await Column.findOneAndUpdate({_id:req.params.id}, {$push:{tasks:newTask}}, {new:true}).exec((err,result) => handleResponse(err,result,resp));
    },
    removeTaskFromColumn : async (req,resp) => {
        await Column.findOneAndUpdate({_id:req.params.id}, {$pull:{tasks:req.body}}).exec((err,result) => handleResponse(err,result,resp));
    },
    moveTask : async (req,resp) => {
        await Column.findOneAndUpdate({_id:req.body.fromcolumnid}, {$pull:{tasks:req.body.taskid}});
        await Column.findOneAndUpdate({_id:req.body.tocolumnid}, {$push:{tasks:req.body.taskid}}, {new:true}).exec((err,result) => handleResponse(err,result,resp));
    }
}