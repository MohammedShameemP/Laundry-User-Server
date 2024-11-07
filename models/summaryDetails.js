const mongoose = require('mongoose');

const summaryDetailsSchema = new mongoose.Schema({
    address:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
})

const SummaryDetails = mongoose.model('summaryDetails',summaryDetailsSchema)
module.exports = SummaryDetails