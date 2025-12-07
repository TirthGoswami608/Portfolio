const express=require("express");
const router=express.Router();
const db =require("../db")


router.post("/",(req,res)=>{
    const{name,email,message}=req.body;
    if (!name||!email||!message){
        return res.status(400).json({error:"all fields required"})
    }
    const sql="INSERT INTO contact_messages(name,email,message)VALUES(?,?,?)";


db.query(sql,[name,email,message],(err,result)=>{
    if(err)return res.status(500).send(err);
    res,json({success:true,id:result.insertId});

});
});
module.exports=router;
