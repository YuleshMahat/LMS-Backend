import { editManybooks, editBook } from "../models/books/bookModel.js";
import {
  getBookById,
  getBorrowedBooks,
  insertBorrows,
  returnBookQuery,
  updateBorrowQuery,
} from "../models/borrows/borrowModel.js";

export const borrowBook = async (req, res) => {
  const calcualteReturnDate = () => {
    //calcualte return date
    const today = new Date();
    const after15Days = new Date(today);
    after15Days.setDate(today.getDate() + 15);
    return after15Days;
  };

  try {
    const userId = req.user._id;
    const { borrowArr } = req.body;

    const bookIds = borrowArr.map((book) => book.bookId);

    const dueDate = calcualteReturnDate();

    const borrowsDocs = borrowArr.map((book) => ({
      bookId: book.bookId,
      title: book.title,
      dueDate,
      userId,
      thumbnail: book.thumbnail || "",
    }));
    //Edit the book record first
    const result = await editManybooks(
      { _id: { $in: bookIds } },
      {
        availability: false,
        expectedAvailable: dueDate,
      }
    );

    if (result) {
      const data = await insertBorrows(borrowsDocs);
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
