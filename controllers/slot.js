const express = require("express");
const Slot = require("../models/timeSlot");

exports.allTime = async (req, res) => {
	try {
		const time = await Slot.find();
		res.status(200).json({ status: true, error: false, message: "all time are listed", data: time });
	} catch (error) {
		res.status(500).json({ status: false, error: true, message: "times not available" });
	}
};