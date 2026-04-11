const mongoose = require("mongoose");

const communityFeedSchema = new mongoose.Schema({
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pet_id: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },

  content: String,
  images: Array,
  hashtags: Array,

  location: Object,
  contact_info: String,

  status: String,
  like_count: { type: Number, default: 0 },
  share_count: { type: Number, default: 0 },

  comments: Array
}, { timestamps: true });

module.exports = mongoose.model("CommunityFeed", communityFeedSchema);