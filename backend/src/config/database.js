const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  const cluster = process.env.MONGODB_CLUSTER;
  const database = process.env.MONGODB_DATABASE;

  const uri = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority&appName=Fullstackprojects`;
  
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;

