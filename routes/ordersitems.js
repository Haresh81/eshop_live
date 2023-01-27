const express=require('express')
const mongoose = require("mongoose")

const orderitems=require("../model/OrderItems")
const insertData=express.Router()

insertData.use(express.json())
insertData.use(express.urlencoded())

insertData.get("/",async(req,res)=>{
    const Orderitemslist = await orderitems.find();
    res.send({Orderitemslist})
    console.log("ordersitems success")
})


insertData.put("/:id", async (req, res) => {
    const orderitemlist = await orderitems.findByIdAndUpdate(
        req.params.id, 
        { name: req.body.name, 
        description: req.body.description, 
        price: req.body.price }, 
        { new: true }
    );

    if(!orderitemlist) return res.status(400).send("the orderitems cannot be created");
    res.send(orderitemlist)
});

insertData.delete("/:id", async (req, res) => {
    const orderitemlist = await orderitems.findByIdAndRemove(req.params.id);

    if(!orderitemlist) return res.status(400).send("the orderitems cannot be created");
    res.send(orderitemlist)
});


insertData.post("/insert",(req,res)=>{
    orderitems.insertMany(req.body,(err,reslut)=>{
        if(err) throw err;
        else{
            res.json({"msg":"ordersitems insert success"})
        }
    })
})


module.exports=insertData;