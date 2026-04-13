import express from "express";
import {
  signup,
  login,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// AUTH
router.post("/signup", signup);
router.post("/login", login);



export default router;