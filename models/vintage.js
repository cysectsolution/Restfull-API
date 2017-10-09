'use strict';
//defining mongoose in our file
var express = require('express');
var mongoose = require('mongoose');
var config = require('../configs/database');


//mongoose.connect(config.datasase);
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } }; 

var mongodbUri = 'mongodb://cysectsolution:cysect123456seven@ds039404.mlab.com:39404/javascript';

mongoose.connect(mongodbUri, options);
var db = mongoose.connection;


var Schema = mongoose.Schema;

//model of how the collection will look like
var TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    }
});

const Task = module.exports = mongoose.model('Tasks', TaskSchema);




