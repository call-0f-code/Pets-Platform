const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema({
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hash_name: String
}, { timestamps: true });

module.exports = mongoose.model("Hashtag", hashtagSchema);