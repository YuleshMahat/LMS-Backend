import express from "express";
import { getUserDetails } from "../controllers/userController.js";
import { authmiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/detail", authmiddleware, getUserDetails);
export default router;
