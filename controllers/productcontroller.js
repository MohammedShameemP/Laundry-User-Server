


const express = require('express');
const Product = require('../models/product');
const WashingProducts = require('../models/userwashings');
const cartDetail = require('../models/cartdetail');

exports.all_products = async (req, res) => {
    console.log("in all_products api ");
    try {
        const all_products = await Product.find();
        console.log("allproducts:",all_products);
        res.status(200).json({ error: false, status: true, message: "Products are listed", data: all_products });
    } catch (error) {
        res.status(500).json({ error: true, status: false, message: "Server error", data: error });
    }
};


exports.count=async (req,res)=>{
    console.log(req.body);
    try {
        const {id}=req.params;
        const count=req.body;
        if (count) {
            const countupdate=await WashingProducts.findByIdAndUpdate(id,{count});
            res.status(200).json({status:true,error:false,message:"count update succesfully",data:countupdate})
        }
    } catch (error) {
        res.status(500).json({status:false,error:true,message:"count not available"})

    }
    
}

exports.cartdetail=async (req,res)=>{
    console.log("req.body in detail",req.body);

    try {

        const {id}=req.query
        const cart=req.body.data
        const totalprice=req.body.totalprice

        const newDetails = new cartDetail({
            userid:id,
            totalprice,
            products:cart
        })
        await newDetails.save()
        console.log("detaislsssssss=",newDetails);
        
                
    } catch (error) {
        console.log("error =",error);
        
    }
    
}