import express from "express";
import {
  createPet,
  getMyPets,
  getPetById,
  updatePet,
  deletePet,
} from "../controllers/petController.js";


import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

// PET ROUTES
router.post("/", authMiddleware, createPet);
router.get("/", authMiddleware, getMyPets);
router.get("/:id", authMiddleware, getPetById);
router.put("/:id", authMiddleware, updatePet);
router.delete("/:id", authMiddleware, deletePet);




export default router;
