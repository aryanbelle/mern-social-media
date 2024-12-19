const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// MongoDB Connection URI
const mongoURI = process.env.MONGOURI;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

// Export the connect function
module.exports = connectDB;
