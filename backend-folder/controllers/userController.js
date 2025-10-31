import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

const requireJwtSecret = () => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }
};

const generateToken = (payload) => {
  requireJwtSecret();
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const setAuthCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: COOKIE_MAX_AGE,
  });
};

const sanitizeUser = (userDoc) => {
  if (!userDoc) return null;
  const user = userDoc.toObject();
  delete user.password;
  return user;
};

export const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    skills,
    description,
    experience,
    education,
    resume,
  } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required",
    });
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      phone,
      address,
      skills: Array.isArray(skills) ? skills : [],
      description,
      experience,
      education: Array.isArray(education) ? education : [],
      resume,
    });

    const token = generateToken({ id: user._id });
    setAuthCookie(res, token);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: sanitizeUser(user),
      token,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }

    const status = error.message.includes("JWT_SECRET") ? 500 : 400;
    return res.status(status).json({
      success: false,
      message: error.message || "Unable to register user",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken({ id: user._id });
    setAuthCookie(res, token);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: sanitizeUser(user),
      token,
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    const status = error.message.includes("JWT_SECRET") ? 500 : 400;
    return res.status(status).json({
      success: false,
      message: error.message || "Unable to login",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch user",
    });
  }
};

