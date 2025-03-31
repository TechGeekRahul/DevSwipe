const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth")

requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
const user = req.user;
console.log(user.firstName +" sent the connection request");
res.send("connection sent successfully");
})

module.exports = requestRouter;