const express=require('express')
const mongoose = require("mongoose")
const categories1 = require('../model/categories')
const products=require("../model/productschema")
const insertData=express.Router()

insertData.use(express.json())
insertData.use(express.urlencoded())

insertData.get("/",(req,res)=>{
    products.find({},(err,arr)=>{
        if(err) throw err
        else
        {
            console.log(arr)
        }
})
});

insertData.put("/:id", async (req, res) => {
    const productlist = await products.findByIdAndUpdate(
        req.params.id, 
        { name: req.body.name, 
        description: req.body.description, 
        price: req.body.price }, 
        { new: true }
    );
    if(!productlist) return res.status(400).send("the products cannot be created");
    res.send(productlist)
});

insertData.delete("/:id", async (req, res) => {
    const productlist = await products.findByIdAndRemove(req.params.id);

    if(!productlist) return res.status(400).send("the products cannot be created");
    res.send(productlist)
});





insertData.post("/insert", async (req,res)=>{
    const categories = await categories1(req.body.categories);
    if(!categories) return res.status(400).send("Invalid categories ")

    let product_new=new products({
        name:req.body.name,
        description: req.body.description,
        richDescription:req.body.richDescription,
        // image:"imagepath",
        brand:req.body.brand,
        price:req.body.price,
        Category:req.body.Category,
        countInStocks:req.body.countInStocks,
        rating:req.body.rating,
        isFeaturesd:req.body.isFeaturesd,
        
    })

    const products_insert =await product_new.save()
    if(!products_insert) return res.status(500).send("the product cannot be created");
    res.send({msg :"product has been add",data :products});
    });


module.exports=insertData;