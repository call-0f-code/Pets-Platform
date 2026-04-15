import express from "express";
import dotenv from "dotenv";
import  connectDB  from "./config/database.js";
import authRoutes from "./routes/authRouter.js";
import profileRoutes from "./routes/profileRouter.js";
import petRoutes from "./routes/petRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());


connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/pets", petRoutes);


app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 8002;

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});