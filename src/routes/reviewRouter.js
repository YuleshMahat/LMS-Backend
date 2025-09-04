import express from "express";
import { authmiddleware } from "../middleware/authmiddleware.js";
import {
  insertReview,
  getReviews,
  getApprovedReviews,
  updateReview,
} from "../controllers/reviewController.js";
const router = express.Router();

router.post("/", authmiddleware, insertReview);
router.get("/", authmiddleware, getReviews);
router.patch("/", authmiddleware, updateReview);
router.get("/:bookId", authmiddleware, getApprovedReviews);
export default router;
