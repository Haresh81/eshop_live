const mongoose =require("mongoose")


const UserSchema = new mongoose.Schema({
    id:{type:String,require:true},
    products:{type:mongoose.Schema.Types.ObjectId,required:true},
    quantity:{type:String,require:true},
})


const OrderItmes =mongoose.model("OrderItmes",UserSchema)

module.exports=OrderItmes;