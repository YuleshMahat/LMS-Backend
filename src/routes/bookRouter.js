import express from "express";
import { authmiddleware, isAdmin } from "../middleware/authmiddleware.js";
import {
  addNewBook,
  fetchBooks,
  updateBook,
} from "../controllers/bookController.js";
import {
  addBookValidator,
  editBookValidator,
} from "../middleware/joimiddlware.js";

const router = express.Router();

router.post("/", addBookValidator, authmiddleware, isAdmin, addNewBook);

router.get("/", authmiddleware, isAdmin, fetchBooks);

router.put("/", editBookValidator, authmiddleware, isAdmin, updateBook);
export default router;
