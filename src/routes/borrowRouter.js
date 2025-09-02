import express from "express";
import { authmiddleware } from "../middleware/authmiddleware.js";
import {
  borrowBook,
  fetchBorrowedBooks,
  returnBook,
  updateBorrow,
} from "../controllers/borrowController.js";

const router = express.Router();

router.post("/", authmiddleware, borrowBook);

router.get("/", authmiddleware, fetchBorrowedBooks);

router.post("/:borrowId", authmiddleware, returnBook);

router.patch("/", authmiddleware, updateBorrow);

export default router;
