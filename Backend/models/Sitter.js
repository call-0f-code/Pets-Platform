const mongoose = require("mongoose");

const sitterSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  bio: String,
  experience_years: Number,
  services: Array,
  pricing_per_day: Number,

  location: Object,
  availability: Object,

  rating: Number,
  reviews: Array
}, { timestamps: true });

module.exports = mongoose.model("Sitter", sitterSchema);