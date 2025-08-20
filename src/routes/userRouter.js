import express from "express";
import { getUserDetails } from "../controllers/userController.js";
import {
  authmiddleware,
  refreshmiddleware,
} from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/detail", authmiddleware, getUserDetails);
export default router;
