
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in .env file");
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

console.log("MONGO_URI", process.env.MONGO_URI);
export default config;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTNjZTc1NTU1ZDE0YjE3M2M2MGRlZSIsImlhdCI6MTc3NjUzNzQyNywiZXhwIjoxNzc2NjIzODI3fQ.S7HslyUCmnT5P-Yjut_lhTc5iPczR2D5ZlQ2_10yJoY