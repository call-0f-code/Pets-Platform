const mongoose = require("mongoose");

const vetSchema = new mongoose.Schema({
  clinic_name: String,
  doctor_name: String,
  specialization: Array,

  phone: String,
  email: String,
  address: String,

  location: Object,
  is_open_now: Boolean,
  rating: Number
}, { timestamps: true });

module.exports = mongoose.model("Vet", vetSchema);