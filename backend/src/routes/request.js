const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")
const mongoose = require("mongoose");




requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
try{

const fromUserId = req.user._id;
const toUserId = req.params.toUserId;
const status = req.params.status;
const allowedStatus = ["ignored","interested"];
if(!allowedStatus.includes(status)){
return res.json({
    message:"Invalid status type"
})
}

if (!mongoose.Types.ObjectId.isValid(toUserId)) {
    return res.status(400).json({ message: "Invalid User ID format" });
}

const validUser = await User.findById(toUserId);
if(!validUser){
    return res.status(404).send("User not found")
}

const existingConnection = await ConnectionRequest.findOne({
    $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
    ]
})
if(existingConnection){
    return res.status(400).json({
        message: "connection is already present"
    })
}

const Connection = new ConnectionRequest({
    fromUserId,toUserId,status,
}) 
const data = await Connection.save();

res.json({
    message:"connection sent successfully",
    data
})
}catch(err){
    res.status(400).send("Error " + err.message)
}
})


requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
    const loggedInUser = req.user;
    const {status,requestId} = req.params;
    const allowedStatus = ["accepted","rejected"];

    if(!allowedStatus.includes(status)){
        return res.status(404).json({
            message:"status not allowed"
        })
    }
    const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser,
        status:"interested"
    })

    if(!connectionRequest){
        return res.status(404).json({
            message:"Connection request not found"
        })
    }
    connectionRequest.status = status;
    const data = await connectionRequest.save();
    res.json({
        message:"connection request" + status,data
    })

    }catch(err){
        res.status(400).send("Error " + err.message)
    }
    })

module.exports = requestRouter;