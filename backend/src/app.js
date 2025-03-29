const express = require("express");
const app =  express();
const connectDb = require("./config/database")
const User = require("./models/user")
app.use(express.json())

app.post("/signup",async (req,res)=>{
try{
    if(req.body.skills.length > 10){
        throw new Error("You can't add more than 10 skills");
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.send("User added successfully")
}catch(err){
    res.status(400).send("error adding the user" + err.message);
}
})
app.get("/user",async (req,res)=>{
try {
    const email = req.body.emailId;
    const user = await User.find({emailId: email});
    if(user.length != 0){
        res.send(user)
    }else{
        res.status(404).send("user not found")
    }
    
} catch (error) {
    res.status(400).send("Something went wrong");
}
})

app.get("/feed",async (req,res)=>{
    try {
    
        const user = await User.find({});
        
            res.send(user)
        
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
    })


app.delete("/user",async(req,res)=>{
    try{
        const userId = req.body.userId;
        const user =  await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("Something went wrong");
    }
})



app.patch("/user/:userId",async(req,res)=>{
    try{
        const userId = req.params?.userId;
        const data = req.body
        const allowedUpdates = ["firstName","lastName","skills","gender","photoUrl","about","userId"];
        const isAllowedUpdates = Object.keys(data).every((k)=>
            allowedUpdates.includes(k)
        )
        if(!isAllowedUpdates){
            throw new Error("Update not allowed");
        }
        if(req.body.skills.length > 10){
            throw new Error("You can't add more than 10 skills");
        }
        
        
        const user =  await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"before",
            runValidators:true,
        });
        res.send("User updated successfully");
    }catch(err){
        res.status(400).send("Error updating the data " + err.message);
    }
})













app.use('/',(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong")
    }
})
connectDb().then(()=>{
    console.log("connected to mongodb successfully")
    app.listen(3000,()=>{
        console.log("server is running on 3000")
    })
}).catch(err =>{
    console.error("database connection failed")
}
)



// listentoit
// singhrahulkumar820

// mongodb+srv://singhrahulkumar820:<db_password>@fullstackprojects.zpy5y.mongodb.net/?retryWrites=true&w=majority&appName=Fullstackprojects