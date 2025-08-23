import express from "express";
import { authmiddleware, isAdmin } from "../middleware/authmiddleware.js";
import {
  addNewBook,
  fetchBooks,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import {
  addBookValidator,
  editBookValidator,
} from "../middleware/joimiddlware.js";

const router = express.Router();

router.post("/", addBookValidator, authmiddleware, isAdmin, addNewBook);

router.get("/", authmiddleware, isAdmin, fetchBooks);

router.put("/", editBookValidator, authmiddleware, isAdmin, updateBook);

router.delete("/", authmiddleware, isAdmin, deleteBook);
export default router;
