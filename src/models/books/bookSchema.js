import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: string,
    required: true,
  },
  author: {
    type: string,
    required: true,
  },
  thumbnail: {
    type: string,
  },
  isbn: {
    type: string,
  },
  genre: {
    type: string,
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
    type: string,
    enum: ["active", "inactive"],
    default: "active",
  },
  averageRating: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("Book", bookSchema);
