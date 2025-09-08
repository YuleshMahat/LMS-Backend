import { editBook } from "../models/books/bookModel.js";
import {
  getBookById,
  getBorrowedBooks,
  insertBook,
  returnBookQuery,
  updateBorrowQuery,
} from "../models/borrows/borrowModel.js";

export const borrowBook = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookId, title } = req.body;
    let thumbnail = "";
    if (req.body.thumbnail) thumbnail = req.body.thumbnail;

    //calcualte return date
    const today = new Date();
    const after15Days = new Date(today);
    after15Days.setDate(today.getDate() + 15);

    const payload = {
      bookId,
      title,
      dueDate: after15Days,
      userId,
      thumbnail,
    };

    //Edit the book record first
    const result = await editBook(
      { _id: bookId },
      { availability: false, expectedAvailable: after15Days }
    );

    if (result) {
      const data = await insertBook(payload);
      if (data) {
        return res
          .status(200)
          .json({ status: true, message: "Borrow successful" });
      } else {
        return res.status(500).json({
          status: false,
          message: "Book Borrow Error",
        });
      }
    } else {
      return res.status(500).json({
        status: false,
        message: "Book Borrow Error",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal sever error" });
  }
};

export const fetchBorrowedBooks = async (req, res) => {
  try {
    const borrows = await getBorrowedBooks({});
    if (borrows) {
      return res
        .status(200)
        .json({ status: true, message: "Borrow successful", borrows });
    } else {
      return res.status(500).json({
        status: false,
        message: "Book Borrow Error",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal sever error" });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.params;
    //get bookId using the borrowId
    const borrowData = await getBookById({ _id: borrowId });
    const today = new Date();

    //change borrows document
    const result = await returnBookQuery(
      { _id: borrowId },
      { status: "returned", returnDate: today }
    );

    //change availability of book
    const data = await editBook(
      { _id: borrowData.bookId },
      { availability: true }
    );
    if (data) {
      return res
        .status(200)
        .json({ status: true, message: "Return successful" });
    } else {
      return res.status(500).json({
        status: false,
        message: "Book Return Error",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal sever error" });
  }
};

export const updateBorrow = async (req, res) => {
  try {
    const { _id, status } = req.body;
    const review = await updateBorrowQuery({ _id }, { status });
    if (review) {
      return res
        .status(200)
        .json({ status: true, message: "Borrow update successful" });
    } else {
      return res.status(500).json({
        status: false,
        message: "Borrow update Error",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal sever error" });
  }
};
