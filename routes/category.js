const express = require('express')
const mongoose = require("mongoose")
const categories1 = require('../model/categories')



const insertData = express.Router()

insertData.use(express.json())
insertData.use(express.urlencoded())

insertData.get("/",(req,res)=>{
    categories1.find({},(err,arr)=>{
        if(err) throw err
        else
        {
            console.log(arr)
        }
})
});

insertData.get("/:id", async (req, res) => {
    const categorieslist = await categories1.findById(req.params.id);

    if (!categorieslist) {
        res.status(500)
            .json({ message: "the categories with the given ID was not found." })
    }
    res.status(200).send(categorieslist)
})

insertData.put("/:id", async (req, res) => {
    const categorieslist = await categories1.findByIdAndUpdate(
        req.params.id, 
        { name: req.body.name, 
        icon: req.body.icon, 
        color: req.body.color }, 
        { new: true }
    );

    if(!categorieslist) return res.status(400).send("the category cannot be created");
    res.send(categorieslist)
});

insertData.delete("/:id", async (req, res) => {
    const categorieslist = await categories1.findByIdAndRemove(req.params.id
    );

    if(!categorieslist) return res.status(400).send("the category cannot be created");
    res.send(categorieslist)
});




insertData.post("/insert", (req, res) => {
    categories1.insertMany(req.body, (err, reslut) => {
        if (err) throw err;
        else {
            res.json({ "msg": "insert success" })
        }
    })
})


module.exports = insertData;