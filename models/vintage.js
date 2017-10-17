'use strict';
//defining mongoose in our file
var express = require('express');
var mongoose = require('mongoose');
var config = require('../configs/database');






var Schema = mongoose.Schema;

//model of how the collection will look like
var VintageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        
    },
    status: {
        type: String,
            
    }
});

const Vintage    = module.exports = mongoose.model('Vintage', VintageSchema);

module.exports.addpost =function(vintage,cb){
    vintage.save(cb);
}
module.exports.getVintageById= function(id,cb){
    
    Vintage.findById(id,cb);

}
module.exports.getVintage = function(vintage,cb){
    Vintage.find();
}