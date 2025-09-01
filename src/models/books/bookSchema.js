import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    isbn: {
      type: String,
      unique: true,
      index: 1,
    },
    description: {
      type: String,
    },
    genre: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
      default: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    averageRating: {
      type: Number,
      required: true,
      default: 0,
    },
    expectedAvailable: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);
