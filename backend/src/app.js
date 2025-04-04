const express = require("express");
const app =  express();
const connectDb = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cors = require("cors");
// const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
// const {validateSignUpData} = require("./utils/validation");
const authRouter = require("./routes/authRoute");
const profileRouter = require("./routes/profileRoute");
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter)
app.use("/",userRouter)



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


