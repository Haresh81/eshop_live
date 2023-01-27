const express=require('express');
const cors=require("cors")
const app = express()
const morgan=require("morgan")
const mongoose = require("mongoose");
const authJwt=require("./helpers/jwt")
require("dotenv/config")
const port=3300;


app.use(cors());
app.options("*",cors());

mongoose.pluralize(null);

mongoose.set("strictQuery",true);
app.use(express.json());
app.use(morgan("tiny"));
// app.use(authJwt)

// const data=require("./routes/user");
// const categories=require("./model/categories");

const userschema=require("./model/userschema");
const OrderItems=require("./model/OrderItems");
const productschema=require("./model/productschema");
const orders=require("./model/Orders");


mongoose
.connect(process.env.CONNECTION_STRING,
{
    useNewUrlParser:true,
    useUnifiedTopology :true,
})
.then(()=> console.log("connected ..."))
.catch((err)=>{
    console.log(err);
});


const User=require("./routes/user");
app.use("/user",User)


const categories=require("./routes/category");
app.use("/categories",categories)

const Order=require("./routes/oders");
app.use("/order",Order)

const orderitems=require("./routes/ordersitems");
app.use("/orderitems",orderitems)

const Products=require("./routes/products");
app.use("/products",Products)

// const Port=process.env.Port
app.listen(port,()=>{
    console.log(`server listening on ${port}`)
})


