import express from "express";
import { authmiddleware, isAdmin } from "../middleware/authmiddleware.js";
import { addNewBook } from "../controllers/bookController.js";
import { addBookValidator } from "../middleware/joimiddlware.js";
import { fetchBooks } from "../controllers/bookController.js";

const router = express.Router();

router.post("/", addBookValidator, authmiddleware, isAdmin, addNewBook);

router.get("/", authmiddleware, isAdmin, fetchBooks);
export default router;
