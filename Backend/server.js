import express from "express";
import dotenv from "dotenv";
import  connectDB  from "./config/database.js";
import cors from "cors";
import authRoutes from "./routes/authRouter.js";
import profileRoutes from "./routes/profileRouter.js";
import petRoutes from "./routes/petRoutes.js";
import CommunityFeedRoute from "./routes/CommunityFeed.js";
import documentRoutes from "./routes/documentRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import dietRouter from "./routes/dietRouter.js"
import healthRouter from "./routes/healthRouter.js"
// import {  from "./controllers/healthController.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());


connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/community", CommunityFeedRoute);
app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/diet_plan", dietRouter);
app.use("/api/healthIn", healthRouter);


app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});