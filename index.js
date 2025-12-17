const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const taskModel = require('./models/Task');

//middleware
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hackathon')
.then(()=>{
    console.log("Successfuly connected to Mongodb atlas!");
    console.log("Now your data is stord in the cloud");
})
.catch((err)=>{
    console.log("Error while connectiong to the server : ", err.message);
    console.log("Make sure you copy the string properly");
});



//middleware to log request
app.use((req,res,next)=>{
    console.log(`${new Date().toLocaleDateString()} - ${req.method}${req.url}`);
    next();
})


// === CURD Routes ===

app.get('/',(req,res)=>{
    const status = mongoose.connect.readyState;
    const statusMessage = {
        0 : 'disconnected',
        1 : 'connected',
        2 : 'connecting',
        3 : 'disconnecting', 
    }
    res.json({
        message : "server is live and connected to the cloud",
        database : "Mongodb atlas",
        status : statusMessage[status] || 'unknown',
        connectionStatus : status,
        day : "Day 2 i have real data base!"
    });
});

//create the task
app.post("/createTask", async (req,res)=>{
    let {title, description} = req.body;

    try{
        const createTask = await taskModel.create({
        title : title,
        description : description || ''
        })
        res.json(createTask);
    }catch(err){
        res.status(400).json({error : err.message})
    }

});

// read the task
app.get("/readTask", async (req,res) => {
    try{
        const readTask = await taskModel.find().sort({createdAt : -1});
        res.json(readTask);
    }catch(err){
        res.status(500).json({error : err.message});
    }
})

//read particular task by id
app.get("/readTask/:id", async (req,res) =>{

    try{
        const task = await taskModel.findById(req.params.id);
        if(!task){
           return res.status(404).json({error : 'Task not found'});
        }
        res.json(task);
    }catch(err){
        res.status(500).json({error : err.message});
    }
})

app.put("/update/:id", async (req,res) =>{
    let {title, description, completed } = req.body;

    try{
        const updatedTask = await taskModel.findByIdAndUpdate({
        title : title,
        description : description,
        completed : completed
        },
            {new : true }
        )

        if(!updatedTask){
        return res.status(404).json({error : "Task not found"});
        }

        res.json(updatedTask);
    }catch(err){
        res.status(500).json({error : err.message})
    }
})

// delete the task
app.delete("/delete/:id", async (req,res)=>{

    try{
        const deleteTask = await taskModel.findByIdAndDelete(req.params.id);
        if(!deleteTask){
            return res.status(404).json({error : "Task not found"});
        }
        res.json({message : "Task deleted successfully"});
    }catch(err){
        res.status(500).json({error : err.message});
    }
})

//server start
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);  
    console.log(`MongoDB Status: ${mongoose.connection.readyState == 1 ? 'CONNECTED' : 'DISCONNECTED'}`);  
})
