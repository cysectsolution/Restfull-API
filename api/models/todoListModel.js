'use strict';
//defining mongoose in our file
var mongoose = require('moongose');
var Schema = mongoose.Schema;

//model of how the collection will look like
var TaskSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the stack'
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

module.exports = mongoose.model('Tasks', TaskSchema);