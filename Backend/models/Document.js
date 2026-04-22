import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  fileUrl: String,
  public_id: String,
  fileType: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Document = mongoose.model("Document", documentSchema);
export default Document;