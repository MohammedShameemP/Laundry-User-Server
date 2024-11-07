// const Otp = require("../models/otp");
const nodemailer=require("nodemailer")
const Otp =require("../models/otp")
const { generateOTP, saveOTPData } = require("./otpdata");
require("dotenv").config();

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },


    
    //  email SMTP port
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, //  email address
        pass: process.env.EMAIL_PASSWORD, //  email password
    },
});

exports.sendOTPviaEmail = async (email, userId) => {
    const otp = generateOTP();
    console.log("otp:",otp);
    const message = `Your OTP is: ${otp}`;
    console.log( "msg:",message );
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Login OTP",
        html: message,
    };
    
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error occurred:", error);
        } else {
            saveOTPData(userId, otp);
            console.log("Email sent successfully to :".yellow, info.accepted);
        }
    });
    await saveOTPData(userId, otp);
    
    console.log("email===",email);
};