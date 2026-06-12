const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')


app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
const userRoutes = require('../src/routes/user.routes.js');

// routes declaration
app.use('/api/v1/users',userRoutes); // -> http://localhost:8000/api/v1/users/something


module.exports = app
