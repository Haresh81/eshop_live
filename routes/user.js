const express=require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require('../model/userschema')
const users=require("../model/userschema")
const insertData=express.Router()

insertData.use(express.json())

insertData.get("/",(req,res)=>{
    users.find({},(err,arr)=>{
    if(err) throw err
    else
    {
        console.log(arr)
    }
})
})

insertData.put("/:id", async (req, res) => {
    const userlist= await users.findByIdAndUpdate(
        req.params.id, 
        { name: req.body.name, 
        email: req.body.email}, 
        { new: true }
    );

    if(!userlist) return res.status(400).send("the user cannot be created");
    res.send(userlist)
});

insertData.delete("/:id", async (req, res) => {
    const userlist= await users.findByIdAndRemove(req.params.id );

    if(!userlist) return res.status(400).send("the user cannot be created");
    res.send(userlist)
});

const jwt=require("jsonwebtoken")
insertData.post("/login", async(req,res)=>{
    const user =await User.findOne({email:req.body.email});
    const secret = process.env.secret;
    
    if(!user){
        return res.status(400).send("the user not found");
    }

    if(user && bcrypt .compareSync(req.body.password, user.passwordHash)){
        const token=jwt.sign(
            {
                userId:user.id,
                isAdmin:true.isAdmin,
            
            },
            secret,
            {expiresIn:"1d"}
        );
        res.status(200).send({user:user.email,token:token});
    }
    else{
        res.status(400).send("password is wrong")
    }
    
});
    
insertData.post("/insert", async (req, res) => {
    console.log("besideinsert");
    let user = new User({
      // id: req.body.id,
      name: req.body.name,
      email:req.body.email,
      passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
      street: req.body.street,
      apartment: req.body.apartment,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
    });
    user = await user.save();
  
    if (!user) return res.status(400).send("the user cannot be created!");
  
    res.send(user);
  });

module.exports=insertData;