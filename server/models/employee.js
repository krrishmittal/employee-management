const mongoose=require("mongoose")
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique: true,
        required:true
    },
    age:{
        type:Number,
        required:true,
    },
    salary:{
        type:Number,
        default: 0
    }
})
module.exports=mongoose.model("Employee",schema)