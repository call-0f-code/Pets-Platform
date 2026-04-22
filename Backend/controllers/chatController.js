import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const chatWithAI = async (req, res) => {
  try {
    const message = req.body.message;

    const user_id = req.user.id;
    const session_id = user_id;

    const response = await axios.post(
      `${process.env.AI_SERVICE_URL}/ask`,
      {
        session_id,
        user_id,
        message,
      }
    );
    res.json({ reply: response.data.reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI failed" });
  }
};