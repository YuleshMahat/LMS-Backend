import jwt from "jsonwebtoken";
import { getUserByEmail } from "../models/users/userModel.js";
import { createAccessToken } from "../utils/jwt.js";

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
    let errorMessage = err.message.includes("jwt expire")
      ? "Expired access token"
      : "Server Error";

    let status = err.message.includes("jwt expire") ? 401 : 500;
    return res.status(status).json({
      status: false,
      message: errorMessage,
    });
  }
};

export const refreshmiddleware = async (req, res, next) => {
  console.log("Resresh token middleware trigerred");
  try {
    let refreshToken = req.headers.authorization;
    let decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    let user = await getUserByEmail(decoded.email);
    if (user) {
      user.password = "";
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        status: false,
        message: "Unauthorized!!",
      });
    }
  } catch (err) {
    let errorMessage = err.message.includes("jwt expire")
      ? "Expired refresh token"
      : "Server Error";
    let status = err.message.includes("jwt expire") ? 401 : 500;
    return res.status(status).json({
      status: false,
      message: errorMessage,
    });
  }
};
