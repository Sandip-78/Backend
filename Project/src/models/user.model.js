const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            uniqued : true,
            lowercase : true,
            trim : true,
            index : true
        },
        email : {
            type : String,
            required : true,
            uniqued : true,
            lowercase : true,
            trim : true,
        },
        fullname : {
            type : String,
            required : true,
            trim : true,
            index : true
        },
        avatar : {
            type : String , // cloudnary string
            required : true
        },
        coverImage : {
            type : String // cloudnary string
        },
        watchedHistory : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
        password : {
            type : String,
            requried : [true, 'Password is required!']
        },
        refreshToken : {
            type : String
        }
    },
    {timestamps : true}
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next(); // this condition is for when user update something detail and stored into db this hook will not change password every time
    this.password = bcrypt.hash(this.password,10) // here is one problem when user change something detail and stored into db this hook changed password every time 
    next() ;
}) // this is mongo hook middleware which perform something before the data stored(mujhe database me password stored krne se pahele hash karvana hai) into database


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {               // payload and this data come from the db
        id : this._id,
        email : this._id,
        username : this.username,
        fullname : this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {             
        id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_SECRET
        }
    )
}

const User = mongoose.model('User',userSchema);

module.exports = User;