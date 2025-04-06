const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        index:true,
        minLength:5,
        maxLength:50,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        lowercase:true,
        trim:true,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        }
    },
    password:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password");
            }
        }
    },
    age:{
        type:Number,
        
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
        
    },
    photoUrl:{
        type:String,
        default:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?semt=ais_hybrid",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("URL is not valid");
            }
        }
    },
    about:{
        type:String,
        default:"This is a default about of the user"
    },
    skills:{
        type:[String]
    }
},{
    timestamps : true,
})
userSchema.methods.getJwt = async function(){
    const user = this;
    const token = await jwt.sign(
        { _id: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return token;
}

userSchema.methods.validatePassword = async function(passwordEnteredByUser){
    const user = this;
    const passwordHash = user.password
    const isCorrectPassword = await bcrypt.compare(passwordEnteredByUser,passwordHash);
    return isCorrectPassword;
}

const userModal = mongoose.model("User",userSchema);
module.exports = userModal;