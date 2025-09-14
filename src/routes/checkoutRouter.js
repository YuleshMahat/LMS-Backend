import express from "express";
import { authmiddleware } from "../middleware/authmiddleware.js";
import { createIntent } from "../controllers/checkoutController.js";

const router = express.Router();

router.post("/", authmiddleware, createIntent);
export default router;
