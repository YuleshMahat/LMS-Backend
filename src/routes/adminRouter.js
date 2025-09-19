import express from "express";
import { changeAdminStaus, getAdmins } from "../controllers/adminController.js";
import { authmiddleware, isAdmin } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/", authmiddleware, isAdmin, getAdmins);

router.post("/", authmiddleware, isAdmin, changeAdminStaus);

export default router;
