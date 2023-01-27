//const { Order } = require("../models/order");
const { Router } = require('express')
const express=require('express')
//const { OrderItem } = require("../models/Order-item");
// const router =express.Router();

// Router.get(`/`, async (req, res) =>{
//     const orderList = await Order.find()
//     .populate("user","name")
//     .sort({ dataOrdered: -1});

//     if(!orderList){
//         res.status(500).json({ success: false});
//     }
//     res.send(orderList);
// });

// Router.get(`/:id`,async (req,res) =>{
//     const order =await Order.findById(req.params.id)
//     .populate("user","name")
//     .populate({
//         path:"orderItems",
//         populate:{
//         path:"orderItems",
//         populate: "category",
//         },
//     });

//     if(!order) {
//         res.status(500).json({ success: false });
//     }
//     res.send(order);
// });


const mongoose = require("mongoose")

const Order=require("../model/Orders")
const insertData=express.Router()

insertData.use(express.json())
insertData.use(express.urlencoded())

insertData.get("/",async(req,res)=>{
    const Orderlist = await Order.find();
    res.send({Orderlist})
    console.log(" oders success")
})


insertData.put("/:id", async (req, res) => {
    const orderlist = await Order.findByIdAndUpdate(
        req.params.id, 
        { name: req.body.name, 
        description: req.body.description, 
        price: req.body.price }, 
        { new: true }
    );

    if(!orderlist) return res.status(400).send("the order cannot be created");
    res.send(orderlist)
});

insertData.delete("/:id", async (req, res) => {
    const orderlist = await Order.findByIdAndRemove(
        req.params.id);

    if(!orderlist) return res.status(400).send("the order cannot be created");
    res.send(orderlist)
});

insertData.post("/insert",(req,res)=>{
    Order.insertMany(req.body,(err,reslut)=>{
        if(err) throw err;
        else{
            res.json({"msg":" orders insert success"})
        }
    })
})


module.exports=insertData;