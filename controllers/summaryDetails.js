const express = require("express");
const SummaryDetails = require("../models/summaryDetails");
const { Message } = require("twilio/lib/twiml/MessagingResponse");
// const SummaryDetails = require("../models/summaryDetails");

exports.summaryDetails = async (req, res) => {
	console.log("in summaryDetails api");
	console.log("req.body", req.body);

	try {
		if (req.body) {
			const { address, destination, phone } = req.body;
			const newsummaryDetails = new SummaryDetails({ address, destination, phone });
			newsummaryDetails.save();
			console.log("newsummaryDetails", newsummaryDetails);

			res.status(200).json({ error: false, status: true, message: "summary details saved", data: newsummaryDetails });
		} else {
			console.log("req.body is empty");
		}
	} catch (error) {}
};
exports.allPickupDetails = async (req, res) => {
	console.log("in pickupDetailsshow api");

	try {
		
			const all_pickupDetails = await SummaryDetails.find () ;
			

			res.status(200).json({ error: false, status: true, message: "summary details saved", data: all_pickupDetails });

		}
	catch (error) {
        console.log(error);
        
    }
}

