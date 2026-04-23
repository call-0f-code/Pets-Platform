import mongoose from "mongoose";

const communityFeedSchema = new mongoose.Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  pet_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Pet" 
  },

  content: {
    type: String,
    trim: true
  },

  images: [
    {
      url: String,
    }
  ],

  hashtags: [
    {
      type: String,
      lowercase: true,
    }
  ],

  location: {
    name: String,
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],

  like_count: {
    type: Number,
    default: 0,
  },
  
}, { timestamps: true });

const CommunityFeed = mongoose.model("CommunityFeed", communityFeedSchema);

export default CommunityFeed;