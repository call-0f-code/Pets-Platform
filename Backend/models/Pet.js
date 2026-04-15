import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String, 
      required: true,
    },
    age: Number,
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    description: String,
    image: String, 

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pet", petSchema);