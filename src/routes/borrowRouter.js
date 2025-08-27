import express from "express";
import { authmiddleware } from "../middleware/authmiddleware.js";
import {
  borrowBook,
  fetchBorrowedBooks,
} from "../controllers/borrowController.js";

const router = express.Router();

router.post("/", authmiddleware, borrowBook);

router.get("/", authmiddleware, fetchBorrowedBooks);
export default router;
