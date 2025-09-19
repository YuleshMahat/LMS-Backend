import express from "express";
import { authmiddleware, isAdmin } from "../middleware/authmiddleware.js";
import {
  addNewBook,
  fetchBooks,
  updateBook,
  deleteBook,
  getAllBooks,
  getFeaturedBooks,
} from "../controllers/bookController.js";
import {
  addBookValidator,
  editBookValidator,
} from "../middleware/joimiddlware.js";
import { upload } from "../middleware/multerconfig.js";

const router = express.Router();

router.post(
  "/",
  upload.single("thumbnail"),
  addBookValidator,
  authmiddleware,
  isAdmin,
  addNewBook
);

router.get("/", authmiddleware, isAdmin, fetchBooks);

router.put("/", editBookValidator, authmiddleware, isAdmin, updateBook);

router.delete("/", authmiddleware, isAdmin, deleteBook);

router.get("/pub-books", getAllBooks);

router.get("/featured-books", getFeaturedBooks);
export default router;
