const mongoose =require("mongoose")


const ProductSchema = new mongoose.Schema({
    // id:{type:String,require:true},
    name:{type:String,require:true},
    description:{type:String,require:true},
    richDescription:{type:String,require:true},
    // image:{type:String,require:true},
    // images:{type:String,require:true},
    brand:{type:String,require:true},
    price:{type:Number,require:true},
    Category:{type:mongoose.Schema.Types.ObjectId,require:true},
    countInStocks:{type:Number,require:true},
    rating:{type:Number,require:true},
    isFeaturesd:{type:Boolean,require:true},
    dataCreated:{type:Date,require:true,default:Date.now},
})

ProductSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

ProductSchema.set("toJSON",{
    virtual:true,
})


const products =mongoose.model("Products",ProductSchema)

module.exports=products;