import { editBook } from "../models/books/bookModel.js";
import { getBorrowedBooks, insertBook } from "../models/borrows/borrowModel.js";

export const borrowBook = async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user._id;
    const { bookId, title, thumbnail } = req.body;

    //calcualte return date
    const today = new Date();
    const after15Days = new Date(today);
    after15Days.setDate(today.getDate() + 15);

    const payload = { bookId, title, thumbnail, dueDate: after15Days, userId };

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
    const userId = req.user._id;
    const borrows = await getBorrowedBooks({ userId: userId });
    console.log("fetchborrowedbooks routee");
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
