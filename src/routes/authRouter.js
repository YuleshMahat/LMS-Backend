import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
} from "../controllers/authController.js";
import { refreshmiddleware } from "../middleware/authmiddleware.js";
import { newAccessToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/verifyEmail", verifyEmail);

router.get("/refreshToken", refreshmiddleware, newAccessToken);
export default router;
