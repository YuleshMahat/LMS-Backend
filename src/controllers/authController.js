import { createUser, getUserByEmail } from "../models/users/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const userObject = req.body;
  console.log(userObject);
  let salt = bcrypt.genSaltSync(parseInt(process.env.SALT) || 10);
  userObject.password = bcrypt.hashSync(userObject.password, salt);

  //create new user after password hashing
  try {
    const result = await createUser(userObject);
    if (result) {
      return res
        .status(200)
        .json({ message: "User successfully created", status: true });
    }
  } catch (error) {
    if (error.message.includes("E11000")) {
      return res
        .status(400)
        .json({ message: "Duplicate email", status: false });
    } else {
      return res.status(500).json({ message: "SERVER ERROR", status: false });
    }
  }
};

export const loginUser = async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await getUserByEmail(email);

    if (user) {
      let passwordMatch = bcrypt.compareSync(password, user.password);
      if (passwordMatch) {
        password = "";

        let payload = {
          email: user.email,
        };

        let accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRESIN,
        });

        return res.status(200).json({
          status: true,
          message: "Login Successful",
          user,
          accessToken,
        });
      } else {
        return res.status(401).json({
          status: false,
          message: "User not authenticated!",
        });
      }
    } else {
      // user not found
      return res.status(401).json({
        status: false,
        message: "The combination of email and password is incorrect!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "SERVER ERROR" });
  }
};
