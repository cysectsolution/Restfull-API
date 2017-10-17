var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var mongoose = require('mongoose');

var  Vintage = require('../models/vintage');






router.get('/', function(req, res, next){
    Vintage.find(function(err,vintage){
        if(err){
            res.send(err);
        }
        res.json(vintage);
    });
});

//Get single task
router.get('/:id', function(req, res, next){
    Vintage.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err,vintage){
        if(err){
            res.send(err);
        }
        res.json(vintage);
    });
});

//Save task
router.post('/', function(req,res,next){
    //var vintage  = req.body;
    let newVintage = new Vintage({
        name : req.body.name,
        created_date : req.body.created_date,
        status : req.body.status
    });
    Vintage.addpost(newVintage,(err,vintage)=>{
        if (err){
            res.json({
                success:false,
                msg:"ngori"
            });
        }else{
            console.log(newVintage)
            res.send(newVintage);
            res.json({
                success:true,
                msg:"Wazii"

            });
        }
    })

   
});

//Delete a task
router.delete('/:id', function(req,res,next){
    Vintage.remove({_id:mongojs.ObjectId(req.params.id)}, function(err, vintage){
        if(err){
            res.send(err);
        }
        res.json(vintage);
    });
});

//update task
router.put('/:id', function(req,res,next){
    var vintage = req.body;
    var upVintage = {};

    if(vintage.name){
        upVintage.name = vintage.name;
    }
    if(vintage.created_date){
        upVintage.created_date = vintage.created_date;
    }
    if(vintage.status){
        upVintage.status = vintage.status;
    }

    if (!upVintage){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    }else {
        Vintage.update({_id: mongojs.ObjectId(req.params.id)}, upVintage, {}, function(err,vintage){
            if(err){
                res.send(err);
            }
            res.json(vintage);
        });
    }
});

module.exports = router;