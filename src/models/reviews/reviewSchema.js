import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      ref: "book",
    },
    userName: {
      type: String,
      required: true,
      ref: "user",
    },
    userId: {
      type: String,
      required: true,
      ref: "user",
    },
    bookId: {
      type: String,
      required: true,
      ref: "book",
    },
    message: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    isApproved: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", reviewSchema);
