import jwt from "jsonwebtoken";
import { getUserByEmail } from "../models/users/userModel.js";

export const authmiddleware = async (req, res, next) => {
  console.log("Authentication middleware triggered.");
  try {
    let accessToken = req.headers.authorization;
    let decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    let user = await getUserByEmail(decoded.email);
    if (user) {
      user.password = "";
      req.user = user;
      console.log(req.user);
      next();
    } else {
      return res.status(401).json({
        status: false,
        message: "Unauthorized!!",
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized!!",
    });
  }
};
