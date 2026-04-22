import User from "../models/User.js";
import bcrypt from "bcryptjs";
// import crypto from "crypto";
import jwt from "jsonwebtoken";

//SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password, contactNo, address } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      contactNo,
      address,
    });

    console.log("USER SAVED:", user);

    res.status(201).json({ msg: "User registered" });

  } catch (err) {
    console.log("SIGNUP ERROR 👉", err); // IMPORTANT DEBUG
    res.status(500).json({ error: err.message });
  }
};
//LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, msg: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
