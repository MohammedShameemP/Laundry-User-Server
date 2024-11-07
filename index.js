const express =require("express");
const app =express();
const colors = require("colors")
const connectDB = require("./config/database");
const cors =require('cors');
const cookieParser=require('cookie-parser')
const router = require('./router/router');
const {register}= require('./router/router')

const PORT = 2006;

app.use(cors());

app.use(express.json());
connectDB();
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

const authUser=require('./router/router')
app.use('/api',authUser);
app.use('/api',router);




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






