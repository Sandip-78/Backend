const mongoose = require('mongoose');

// create schema for database
const taskSchema = new mongoose.Schema({
    title :{
        type : String,
        require : true,
        trim : true
    },
    description : {
        type : String,
        default : ''
    },
    completed : {
        type : Boolean,
        default : false
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

//create model
const Task = mongoose.model('Task',taskSchema);

// now export these model so other can use it
module.exports = Task;