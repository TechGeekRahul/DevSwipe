const express = require("express");
const app =  express();
const connectDb = require("./config/database")
const User = require("./models/user")

app.post("/signup",async (req,res)=>{
const userObj = {
    firstName: "Elon",
    lastName: "Musk",
    emailId:"elon@gmail.com",
    password:"123852"
}



try{
    const newUser = new User(userObj);
    await newUser.save();
    res.send("User added successfully")
}catch(err){
    res.status(400).send("error adding the user" + err.message);
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