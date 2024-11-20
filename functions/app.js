const express = require("express");
const app = express();
const colors = require("colors");
const connectDB = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router/router");
const serverless = require("serverless-http");

const PORT = 2006;

// Enable CORS for all origins
// const cors = require('cors');
app.use(cors());
// app.options('*', cors());

app.use(express.json());
connectDB();
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

// Routing setup
app.use("/.netlify/functions/app", router);

module.exports.handler = serverless(app);