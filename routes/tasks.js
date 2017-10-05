var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
, Server = require('mongodb').Server;
var db = new MongoClient(new Server('mongodb://cysectsolution:cysect123456seven@ds149382.mlab.com:49382/eazytoi',['tasks']));


//Get all tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err,tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

//Get single task
router.get('/tasks/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err,task){
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
         db.tasks.save(task,function(err, task){
            if (err){
                res.send(err);
            }
            res.json(task);
         });
     }
});

//Delete a task
router.delete('task/:id', function(req,res,next){
    db.task.remove({_id:mongojs.ObjectId(req.params.id)}, function(err, task){
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
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, upTask, {}, function(err,task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;