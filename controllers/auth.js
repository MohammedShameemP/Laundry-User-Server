const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt =require("bcrypt")
// const { userToken } = require("./token");
const User = require("../models/user");
const { createJWT } = require("../utils/jwt");
const { sendOTPviaEmail } = require("../utils/nodemailer");
const { sendOTPviaSMS } = require("../utils/twilio");
const Otp = require("../models/otp");
// const env = require;

// // Token generation function
const maxAge = 1 * 24 * 60 * 60;

const 	emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^(\+\d{1,3})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

exports.register = async (req, res) => {
	console.log("req body = ", req.body);
    try {
        const { username, emailOrPhone, password } = req.body;
        const userExist = await User.findOne({ emailOrPhone }); // checking if the email or phone number is already use
        if (userExist) {
            res.status(400).json({ error: true, message: "user already exist" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, emailOrPhone, password: hashedPassword });
        newUser.save();
        const data = {
            username: newUser.username,
            emailOrPhone: newUser.emailOrPhone,
        };
        // const token = await createJWT(data);
        // console.log({ token });

        res.status(200).json({ error: false, status: true, message: "user registered successfully", data, token });
        console.log("user register successfully");
    } catch (error) {
        console.log("server error ", error);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};
	
	exports.login = async (req, res) => {
		console.log("in login api");
		try {
		const { emailOrPhone, password } = req.body;
		console.log("req.body", req.body);
		const user = await User.findOne({emailOrPhone:emailOrPhone });
		console.log("user=", user);
				
		if (!user) {
			return res.json({ status: false, message: "User does not exist" });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			console.log("Invalid password");
			return res.status(401).json({ status: false, message: "Invalid password" });
		}


		if (emailRegex.test(user.emailOrPhone)) {
            console.log("the request is Email");
            sendOTPviaEmail(user.emailOrPhone, user._id);
        } else if (phoneRegex.test(user.emailOrPhone)) {
            console.log("the request is Phone number");
            sendOTPviaSMS(user.emailOrPhone, user._id);
        }
        const data = {
            userId: user._id,
            username: user.username,
            emailOrPhone: user.emailOrPhone,
        };
        res.status(200).json({ error: false, status: true, message: "OTP sended successfully", data});
    } catch (error) {
        console.log("server error ", error);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.verify_otp_login=async(req,res)=>{
    console.log("in verify_otp_login api");
    try {
        const{otp,userId}=req.body;
        const otpexist=await Otp.findOne({userId,otp});
        console.log("otpexist:",{otpexist});
        if(otpexist){
            const user=await User.findById(userId ,{password:0,});
            console.log('userrrrrrr',{ user });
            if(user){
                const data = {
                    username: user.username,
                    emailOrPhone: user.emailOrPhone,
                };
                const token = await createJWT(data);
                console.log("token:", {token});
                console.log("user logined successfully".yellow);
                res.status(200).json({ error: false, status: true, message: "user logined successfully", data: user, token });
            }

        
        }else {
        console.log("OTP is incorrect".bold.red);
        res.status(400).json({ error: true, message: "OTP is incorrect" });
    }
} catch (error) {
    console.log("server error ", error);
    res.status(500).json({ error: true, status: false, message: "server error" });
}
};





















// 		const token = jwt.sign({ id: user._id }, "user secret key", {
// 			expiresIn: maxAge,
// 		});
// 		console.log(token, "tokeeeeeeeeeeeeeeeennnnn");
// 		const username = user.username;
// 		const id = user._id;
		
// 		res.status(200).json({ error: false, status: true, message: "Login successfull",data:{token, username, id}  });
		
// 		console.log("Login successfull");
// 	} catch (error) {
// 		console.log("server error", error);
// 		res.status(500).json({ error: true, status: false, message: "Server error" });
// 	}
// };






















// exports.mobile = async (req, res) => {
	// 	console.log(req.body);
	// };
	
	// 	const token=req.cookies.jwt
	
	// 	if(token){
		// 		jwt.verify(token,async(error)=>{
			// 			if(token){
				// 				console.log("there is token");
				
				// 			}
				// 			else{
					
				// 			}
				// 		})
				// 	}
				// exports.login = async (req, res) => {
// 	const { email, password } = req.body;
// 	console.log("req.body",req.body);
// 	const user = await Users.findOne({ email});
// 	if (user) {
	// 		if (user.password === password) {
		// 			console.log("success");
		// 			res.json("success");
// 		} else {
// 			console.log("not success");
// 			res.json(" not success");
// 		}
// 	} else {
// 		res.json("user does not exist");
// 	}
// };
