const express=require("express");
const Employee = require("../models/employee");
const router=express.Router()


router.get("/",async (req,res)=>{
    try {
        const emp=await Employee.find();
        res.status(200).json(emp)
    } catch (error) {
        res.status(400).json({message:"error in getting employee"})
    }
})

router.post("/",async (req,res)=>{
    const {name,email,age,salary}=req.body;
    if (!name || !email || !age ) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newEmployee= new Employee({
        name:name,
        email:email,
        age:age,
        salary:salary??0
    })
    try {
        const savedEmployee=await newEmployee.save()
        res.status(201).json(savedEmployee)
    } 
    catch (error) {
        res.status(400).json({message:"employee addtion failed"})
    }
})

router.put("/:id",async(req,res)=>{
    const {id}=req.params;
    const {name,email,age,salary}=req.body;
    try {
        const existingEmployee = await Employee.findById(id);
        if (!existingEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        if(email!==existingEmployee.email) {
            const emailExists=await Employee.findOne({ email });
            if(emailExists){
                return res.status(400).json({ message: "Email already in use by another employee" });
            }
        }
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { name, email, age, salary},
            {new:true}
        )
        res.status(200).json(updatedEmployee);
    } 
    catch (error) {
        res.status(400).json({message:"employee updation failed"})
    }
})

router.delete("/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const deleteEmployee= await Employee.findByIdAndDelete(id)
        if(!deleteEmployee){
            return res.status(404).json({message:"Employee not found"})
        }
        res.status(200).json({message:"Employee removed successfully"})
    } 
    catch (error) {
        res.status(400).json({message:"employee deletion failed"})
    }
})

module.exports=router