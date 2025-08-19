import express from "express";
import { authmiddleware, isAdmin } from "../middleware/authmiddleware.js";
import { addNewBook } from "../controllers/bookController.js";

const router = express.Router();

router.post("/", authmiddleware, isAdmin, addNewBook);
export default router;
