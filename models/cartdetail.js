const mongoose = require("mongoose");

const cartDetailSchema = new mongoose.Schema({
	userid: { type: mongoose.Schema.ObjectId, required: true, ref: "users" },
	totalprice: { type: Number, required: true },
	products: [{
		productid: { type: mongoose.Schema.ObjectId, ref: "products" },
		cartcount: { type: Number, required: true }
	}],
});
const cartDetail = mongoose.model("cartdetails", cartDetailSchema);
module.exports = cartDetail;
