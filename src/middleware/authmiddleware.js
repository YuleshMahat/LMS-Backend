import { getUserByEmail } from "../models/users/userModel.js";
import { decodeAccessToken, decodeRefreshToken } from "../utils/jwt.js";

export const authmiddleware = async (req, res, next) => {
  try {
    console.log("Triggered auth middleware");
    let accessToken = req.headers.authorization;
    let decoded = decodeAccessToken(accessToken, "access");
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
      ? "Expired access token"
      : "Server Error";
    console.log(err);

    let status = err.message.includes("jwt expire") ? 401 : 500;
    return res.status(status).json({
      status: false,
      message: errorMessage,
    });
  }
};

export const refreshmiddleware = async (req, res, next) => {
  try {
    let refreshToken = req.headers.authorization;
    let decoded = decodeRefreshToken(refreshToken);
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

export const isAdmin = async (req, res, next) => {
  if (req.user.role === "admin") next();
  else return res.json({ status: false, message: "Not authorized" });
};
