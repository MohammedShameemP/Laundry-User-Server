const express = require("express");
// const { register,login } = require("../middleware/");
const { all_services } = require("../controllers/servicescontroller");
const { all_products, count, cartdetail } = require("../controllers/productcontroller");
const { register, login, verify_otp_login } = require("../controllers/auth");
const {summaryDetails, allPickupDetails} = require("../controllers/summaryDetails");
const { allTime } = require("../controllers/slot");
const router = express.Router();

router.post("/register", register);
router.post("/login",login);
// router.post("/mobile",mobile);

// Products list
router.get("/allproducts",all_products)

// service router
router.get("/all_services",all_services);


// node mailer router
router.post("/verify_otp_login",verify_otp_login)

router.put("/count/:id",count)

// cart details save
router.post("/cartdetail",cartdetail)

// summaryDetails save
router.post("/summaryDetails",summaryDetails)


router.get("/allPickupDetails",allPickupDetails)

// timeslot
router.get("/allTime", allTime);














module.exports = router;


 