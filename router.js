const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const router = express.Router();

// connect MongoDB
async function connectDB(){
    try {
        await mongoose.connect("mongodb://localhost:27017/ProductList",{
            useCreateIndex:true,
            useNewUrlParser:true
        })
        console.log("connect successful");
    } catch (error) {
        console.log("fail");
    }
}
connectDB();

// create Schema

const Schema = mongoose.Schema;

const ProductModel = mongoose.model("product", {
    productID :String,
    productName :String, 
    price : String,
    quatity : String
});


router.get("/",async (req, res,next)=>{
    try {
        var result = await ProductModel.find().exec();
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.get("/:id",async (req, res,next)=>{
    try {
        var result = await ProductModel.findOne({productID : req.params.id}).exec();
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/",async (req, res,next)=>{
    try {
        var product =new ProductModel(req.body)
        var result = await product.save();
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put("/:id",async (req, res,next)=>{
    try {
        var product = await ProductModel.findOne({productID : req.params.id}).exec();
        product.set(req.body);
        var result = await product.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete("/:id",async (req, res,next)=>{
    try {
        var product = await ProductModel.deleteOne({productID : req.params.id}).exec();
        res.send(product);
    } catch (error) {
        res.status(500).send(error)
    }
})



// exports this router to use
module.exports =router;
