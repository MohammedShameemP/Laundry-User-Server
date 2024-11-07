const express =require("express");
const Service = require("../models/service");


exports.all_services=async(req,res)=>{
    console.log("Services are list");



    try {
        const all_services=await Service.find();
        console.log(all_services);
        res.status(200).json({error:false,status:true,messge:"Servives are listed",data:all_services})

        
    } catch (error) {
        res.status(500).json({error:true,status:false,messge:"Server error",data:error})


        
    }
};

