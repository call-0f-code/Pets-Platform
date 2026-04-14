//models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pets: [
    { type: mongoose.Schema.Types.ObjectId,
     ref: "Pet" }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);