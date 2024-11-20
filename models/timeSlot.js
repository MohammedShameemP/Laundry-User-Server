const mongoose = require("mongoose");

const slottschema = new mongoose.Schema({
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
});
const Slot = mongoose.model("slots", slottschema);
module.exports = Slot;
