import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  uploadDocument,
  getDocumentsByPet,
  deleteDocument,
} from "../controllers/DocumentController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadDocument);
router.get("/pet/:petId", getDocumentsByPet);
router.delete("/:id", deleteDocument);

export default router;