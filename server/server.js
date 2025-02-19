const express =require("express")
const app=express()
const mongoose=require("mongoose")
const empSchema=require("./models/employee")
const router=require("./routes/employee")
const cors = require("cors");

mongoose.connect("mongodb+srv://krrish:test@cluster0.y77lq.mongodb.net/employee").then(()=>{
    console.log("connected to db")
})
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true, 
})); 
app.use(express.json());
app.use("/employee", router);

app.listen(4000,()=>{
    console.log("listening at 4000")
})