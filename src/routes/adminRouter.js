import express from "express";
import {
  changeAdminStaus,
  getAdmins,
  fetchUsers,
  deleteAccount,
} from "../controllers/adminController.js";
import { authmiddleware, isAdmin } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/", authmiddleware, isAdmin, getAdmins);

router.get("/users", authmiddleware, isAdmin, fetchUsers);

router.post("/", authmiddleware, isAdmin, changeAdminStaus);

router.post("/users", authmiddleware, isAdmin, deleteAccount);

export default router;
