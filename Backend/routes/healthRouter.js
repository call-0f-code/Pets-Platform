import express from "express";
import { health } from "../controllers/healthController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router();
router.post("/", authMiddleware, health);
export default router;