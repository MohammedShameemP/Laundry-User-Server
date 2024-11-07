const mongoose = require('mongoose')
const { Schema } = mongoose

const washingProductsSchema = Schema({
    user: {type: Schema.Types.ObjectId,  ref: 'users', require: true},
    products: [{
        productId: {type : Schema.Types.ObjectId, ref: 'products', require: true},
        // count: {type: Number, default: 0, require: true}
    }]
})


const WashingProducts = mongoose.model("washingProducts",washingProductsSchema);    
module.exports = WashingProducts;