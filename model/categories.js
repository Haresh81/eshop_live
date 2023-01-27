
const  mongoose = require("mongoose");


const UserSchema=new mongoose.Schema({
    // id:{type:String,required:true},
    name:{type:String,required:true},
    color:{type:String,required:true},
    icon:{type:String,required:true},
    image:{type:String,required:true},
})

const categories1=mongoose.model('Categories',UserSchema)
module.exports=categories1;