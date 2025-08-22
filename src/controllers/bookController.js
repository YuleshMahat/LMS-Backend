import { addBook, editBook, getBooks } from "../models/books/bookModel.js";

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

export const fetchBooks = async (req, res) => {
  try {
    const filter = req.body;
    const data = await getBooks(filter);
    if (data) {
      return res.status(200).json({
        status: true,
        message: `Found ${data.length} books`,
        books: data,
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Error fetching books from the database",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const updateBook = async (req, res) => {
  try {
    console.log("updatebook route triggered");
    const updateObj = req.body;
    console.log(updateObj);
    const data = await editBook({ _id: updateObj._id }, updateObj);
    if (data) {
      return res
        .status(200)
        .json({ status: true, message: "Update successful" });
    }
    return res
      .status(500)
      .json({ status: false, message: "Error updating data" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
