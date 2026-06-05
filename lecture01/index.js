require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send('Hello World!');
})

app.get('/youtube', (req,res) => {
    res.send('I am learning backend from youtube');
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})