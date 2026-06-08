const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true
        } ,
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true
        },
        password : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
        }
    },{timestamps : true}
);

export const User = mongoose.model("User",userSchema); // when we stored the data mongodb store it with users singular convent into pular and lowercase 
// this is called data modeling in mongoose