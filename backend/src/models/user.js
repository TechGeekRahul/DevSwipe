const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:Number,
        required: true,
    }
})
const userModal = mongoose.model("User",userSchema);
module.exports = userModal;