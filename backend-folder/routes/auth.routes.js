import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/isAuth.js";

export const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getCurrentUser);

export { verifyToken };
export default router;

