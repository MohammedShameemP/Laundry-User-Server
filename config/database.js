const mongoose = require ("mongoose")

const mongoURI = "mongodb+srv://Mohammed_Shameem:Shameem%40123@database.n4x6x.mongodb.net/?retryWrites=true&w=majority&appName=Database";
// const mongoURI = "mongodb://localhost:27017/LaundryApp";

const connectDB = async ()=>{
    mongoose.connect(mongoURI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err);
	});

}

module.exports = connectDB