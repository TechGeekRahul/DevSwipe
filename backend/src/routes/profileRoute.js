const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");

const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const {validateUpdateData} = require("../utils/validation")

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if(!validateUpdateData(req)){
            throw new Error("Invalid Edit Request");
        }
        const loggenInUser = req.user;
        Object.keys(req.body).forEach((key)=> loggenInUser[key] = req.body[key]);
        await loggenInUser.save();
    
        res.json({
            message:`${loggenInUser.firstName} , Your profile updated successfully`,
            data:loggenInUser
        })
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
    

 
});


profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const { password } = req.body;
        const loggedInUser = req.user;

        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: "Enter a strong password" });
        }

    
        const hashedPassword = await bcrypt.hash(password, 10);
        loggedInUser.password = hashedPassword;
        
        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your password was updated successfully`,
            data: loggedInUser,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = profileRouter;
