const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  name: String,
  species: String,
  breed: String,
  dob: Date,
  gender: String,
  weight: Number,

  allergies: Array,
  medical_conditions: Array,
  vaccinations: Array,
  medical_records: Array,
  weight_history: Array,
  reminders: Array,

  image_url: String
}, { timestamps: true });

module.exports = mongoose.model("Pet", petSchema);