const mongoose =require('mongoose');
const User = require('./user');

const productschema=new mongoose.Schema({
	image: { type: String, required: true },
	name: { type: String, required: true },
	price: { type: String, required: true },
})
const Product=mongoose.model("products",productschema);    
module.exports=Product;

