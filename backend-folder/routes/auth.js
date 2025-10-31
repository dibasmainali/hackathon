import { Router } from "express";
import { verifyToken } from "./auth.routes.js";
import dotenv from "dotenv";

dotenv.config();
export const careerRouter = Router();

// Public route - Get basic career info
careerRouter.get("/", async (req, res) => {
  try {
    res.json({ message: "Welcome to Career Guide API" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected route - Get personalized career guidance
careerRouter.get("/guidance", verifyToken, async (req, res) => {
  try {
    // Access authenticated user info through req.user
    const username = req.user.username;
    res.json({
      message: `Career guidance for ${username}`,
      // Add your career guidance logic here
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected route - Save career preferences
careerRouter.post("/preferences", verifyToken, async (req, res) => {
  try {
    const { interests, skills } = req.body;
    // Add logic to save career preferences
    res.json({ message: "Career preferences saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});