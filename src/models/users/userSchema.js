import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
  refreshJWT: {
    type: String,
  },
  emailVerificationToken: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);
