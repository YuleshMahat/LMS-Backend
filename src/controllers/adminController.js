import {
  getUserById,
  getUsers,
  updateUser,
} from "../models/users/userModel.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await getUsers({ role: "admin" });
    if (admins) {
      res
        .status(200)
        .json({ status: true, message: "Fetched admin users", admins });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const changeAdminStaus = async (req, res) => {
  try {
    const id = req.body._id;

    const admin = await getUserById(id);

    if (!admin) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (admin && admin.role === "admin") {
      await updateUser(id, { role: "student" });
    }

    if (admin && admin.role === "student") {
      await updateUser(id, { role: "admin" });
    }

    res.status(200).json({ status: true, message: "Updated admin status" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
