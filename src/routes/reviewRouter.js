import express from "express";
import { authmiddleware } from "../middleware/authmiddleware.js";
import { insertReview, getReviews } from "../controllers/reviewController.js";
const router = express.Router();

router.post("/", authmiddleware, insertReview);
router.get("/", authmiddleware, getReviews);
router.get("/approved", authmiddleware, getApprovedReviews);
export default router;
