import {
  createUser,
  getUserByEmail,
  updateUser,
} from "../models/users/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import sendEmailVerificationTemplate from "../utils/mailProcessor.js";

export const registerUser = async (req, res) => {
  console.log("register route hit");
  const userObject = req.body;
  let salt = bcrypt.genSaltSync(parseInt(process.env.SALT) || 10);
  userObject.password = bcrypt.hashSync(userObject.password, salt);

  //create new user after password hashing
  try {
    const newUser = await createUser(userObject);
    if (newUser) {
      const uniqueToken = uuidv4();
      try {
        //try catch block for updating the user with unique user token
        const result = await updateUser(newUser._id, {
          emailVerificationToken: uniqueToken,
        });
        console.log(result);
        const url = `${process.env.ROOT_DOMAIN}/verify-email?t=${uniqueToken}&email=${newUser.email}`;
        console.log(url);
        await sendEmailVerificationTemplate({
          to: newUser.email,
          url,
          userName: newUser.fName,
        });
      } catch (err) {
        console.log(err, "error updating the user with verification token");
      }

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
  console.log(req.body);
  let { email, password } = req.body;
  console.log("Email recieved from the fronted " + email);
  console.log("Password recieved from the frontend " + password);

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

export const verifyEmail = async (req, res) => {
  console.log("verify email route hit");
  const email = req.query.email;
  const token1 = req.query.t;
  let token2 = "";
  let user_id = "";
  try {
    const user = await getUserByEmail(email);
    if (user) {
      token2 = user.emailVerificationToken;
      user_id = user._id;
      console.log("query token ", token1, "db token ", token2);
    }
  } catch (error) {
    console.log("Error fetching the user details");
    return res.status(500).json({ status: false, message: "SERVER ERROR" });
  }
  if (token1 === token2) {
    const result = await updateUser(user_id, { verified: true });
    return res.status(200).json({ status: true, message: "USER VERIFIED" });
  } else {
    return res
      .status(401)
      .json({ status: false, message: "USER NOT VERIFIED" });
  }
};
