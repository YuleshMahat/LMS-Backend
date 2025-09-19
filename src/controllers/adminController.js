import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../models/users/userModel.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await getUsers({ role: "admin" });
    if (admins) {
      return res
        .status(200)
        .json({ status: true, message: "Fetched admin users", admins });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const fetchUsers = async (req, res) => {
  try {
    const users = await getUsers();
    if (users) {
      res
        .status(200)
        .json({ status: true, message: "Fetched all users", users });
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

    return res
      .status(200)
      .json({ status: true, message: "Updated admin status" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const id = req.body._id;
    const admin = await deleteUser(id);

    if (!admin) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Successfully deleted user" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
