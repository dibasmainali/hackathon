import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes, { verifyToken } from "./auth.routes.js";
import { generateResume } from "../utils/resumeBuilder.js";

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Auth routes
app.use("/auth", authRoutes);

// Protected Routes
app.post("/resume", verifyToken, async (req, res) => {
  try {
    const resume = await generateResume(req.body);
    res.json(resume);
  } catch (err) {
    res.status(500).json({ 
      error: "Error generating resume",
      details: err.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something broke!',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default app;