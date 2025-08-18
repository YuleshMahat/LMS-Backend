import express from "express";
import { authmiddleware } from "../middleware/authmiddleware.js";
import { addNewBook } from "../controllers/bookController.js";

const router = express.router();

router.post("/addNewBook", authmiddleware, addNewBook);
export default router;
