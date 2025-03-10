const express = require("express");
const app =  express();
app.get('/',(req,res)=>{
    res.send("hello from rahul")
})

app.get('/test',(req,res)=>{
    res.send("hello from test")
})

app.get('/root',(req,res)=>{
    res.send("hello from root")
})
app.listen(3000,()=>{
    console.log("server is running on 3000")
})