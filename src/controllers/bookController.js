import { addBook } from "../models/books/bookModel.js";

export const addNewBook = async (req, res) => {
  console.log("add new book function trigerred");
  const bookObj = req.body;
  try {
    const result = await addBook(bookObj);
    if (result) {
      return res
        .status(200)
        .json({ status: true, message: "Successfully inserted the book" });
    }
    return res
      .status(500)
      .json({ status: false, message: "Error inserting the book" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
