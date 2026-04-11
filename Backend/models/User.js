const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password_hash: { type: String, required: true },
  phone: String,
  avatar_url: String,
  role: { type: String, default: "user" },
  location: Object
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);