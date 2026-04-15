import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI);

    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB connected !!!!!!!!!!!!!!!!!!!!");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
