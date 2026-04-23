//path: Backend/controllers/DocumentController.js
import Document from "../models/Document.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

//  Upload
export const uploadDocument = async (req, res) => {
  try {
    const { petId, title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log("BODY:", req.body);
console.log("FILE:", req.file);
    const result = await uploadToCloudinary(req.file.buffer);

    const doc = await Document.create({
      pet: petId,
      user: req.user?.id,
      title,
      fileUrl: result.secure_url,
      public_id: result.public_id,
      fileType: result.resource_type,
    });

    res.status(201).json(doc);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get documents by pet
export const getDocumentsByPet = async (req, res) => {
  try {
    const { petId } = req.params;

    const docs = await Document.find({ pet: petId })
      .sort({ createdAt: -1 });

    res.json(docs);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Delete document
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await Document.findById(id);

    if (!doc) {
      return res.status(404).json({ message: "Document Deleted" });
    }

    await cloudinary.uploader.destroy(doc.public_id);

    await Document.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};