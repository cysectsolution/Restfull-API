'use strict'

//Setting up the controller
var mongoose = require('mongoose'),
    Task = mongoose.model('Tasks');

//displaying the tasks from the database
exports.list_all_tasks = function(req, res) {
    Task.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

//inserting a new task  into the database
exports.create_a_task = function(req, res) {
    var new_task = new Task(req.body);
    new_task.save(function(err, task){
        if (err)
            res.send(err);
        res.json(task);
    });
};

//finding a specific task that matches its id
exports.read_a_task = function(req, res) {
    Task.findById(req.params.taskId, function(err, task){
        if (err)
            res.send(err);
        res.json(task);
    });
};

//update the task that has been found
exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
}

//removing a task from the database
exports.delete_a_task = function(req, res){
    Task.remove({
      _id: req.params.taskId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted'}); 
    });
};