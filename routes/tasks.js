var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var mongoose = require('mongoose');

var Task = require('../models/vintage');

//var config = require('../configs/database')
//db=mongoose.connect(config.database);
//Get all tasks
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } }; 

var mongodbUri = 'mongodb://cysectsolution:cysect123456seven@ds039404.mlab.com:39404/javascript';

mongoose.connect(mongodbUri, options);
var db = mongoose.connection; 

db.on('error', console.error.bind(console, 'connection error:'));  

router.get('/tasks', function(req, res, next){
    db.find(function(err,tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

//Get single task
router.get('/tasks/:id', function(req, res, next){
    db.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Save task
router.post('/task', function(req,res,next){
    var task = req.body;
     if (!task.title || (task.isDone + '')){
         res.status(400);
         res.json({
             "error": "Data is not valid"
         });
     }else {
         db.save(task,function(err, task){
            if (err){
                res.send(err);
            }
            res.json(task);
         });
     }
});

//Delete a task
router.delete('task/:id', function(req,res,next){
    db.remove({_id:mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//update task
router.put('/task/:id', function(req,res,next){
    var task = req.body;
    var upTask = {};

    if(task.isDone){
        upTask.isDone = task.isDone;
    }
    if(task.title){
        upTask.title = task.title;
    }

    if (!upTask){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    }else {
        db.update({_id: mongojs.ObjectId(req.params.id)}, upTask, {}, function(err,task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;