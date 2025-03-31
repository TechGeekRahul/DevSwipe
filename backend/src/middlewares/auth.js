const jwt = require("jsonwebtoken");
const User = require("../models/user")
const userAuth = async(req,res,next)=>{
    try {
        const {token} = req.cookies;
        

if (!token || typeof token !== "string") {
            throw new Error("Token is missing or not valid");
        }
const decodedObj = await jwt.verify(token,"Devswipe@rahul");
const {_id} = decodedObj;
const user = await User.findById(_id);
if(!user){
    throw new Error("User not found");
    
}
req.user = user;
next()

    } catch (err) {
        res.status(400).send("Error hii : " + err.message);
    }

}

module.exports = {
    userAuth
}