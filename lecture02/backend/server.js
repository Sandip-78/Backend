const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3000;

app.use(cors());

app.get('/', (req,res)=>{
    res.send("Home Route");
})

app.get('/api/jokes',(req,res)=>{
    const jokes = [
  {
    number: 1,
    title: "Programmer Joke",
    content: "Why do programmers prefer dark mode? Because light attracts bugs!"
  },
  {
    number: 2,
    title: "Array Joke",
    content: "Why did the array break up with the object? It needed more space."
  },
  {
    number: 3,
    title: "Database Joke",
    content: "I told my database a joke, but it couldn't relate."
  },
  {
    number: 4,
    title: "Frontend Joke",
    content: "Why was the JavaScript developer sad? Because he didn't Node how to Express himself."
  },
  {
    number: 5,
    title: "Backend Joke",
    content: "A backend developer walks into a bar. The bartender says, '404 drink not found.'"
  }
];
    res.send(jokes);
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})