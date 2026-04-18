import express from "express";
import { Diet } from "../controllers/dietController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router();
router.post("/",authMiddleware, Diet);

export default router;