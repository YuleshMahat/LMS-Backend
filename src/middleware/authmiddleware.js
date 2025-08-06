import jwt from "jsonwebtoken";
import { getUserByEmail } from "../models/users/userModel.js";

export const auth = async (req, res, next) => {
  console.log("Authentication triggered");
  try {
    let accessToken = req.headers.authorization;
    let decoded = jwt.verify(accessToken, process.env.JWT_SECRRET);

    let user = await getUserByEmail({ email: decoded.email });

    if (user) {
      user.password = "";
      req.password = user;
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
