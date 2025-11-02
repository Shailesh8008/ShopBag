const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect();
    console.log("DB connected successfully!");
  } catch (error) {
    console.log("Failed to connect to DB!");
  }
};

module.exports = connectDB;
