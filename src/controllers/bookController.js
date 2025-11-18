import {
  addBook,
  deleteBookById,
  editBook,
  getBooks,
  getBooksByOrder,
} from "../models/books/bookModel.js";
import slugify from "slugify";
import { getBooksByOccurance } from "../models/borrows/borrowModel.js";

export const addNewBook = async (req, res) => {
  const bookObj = req.body;
  const slug = slugify(bookObj.title);
  try {
    const image = req.file.path;
    const result = await addBook({ ...bookObj, slug, image: image });
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
    const updateObj = req.body;
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

export const deleteBook = async (req, res) => {
  try {
    const deleteId = req.body.id;
    const data = await deleteBookById(deleteId);
    if (data) {
      return res
        .status(200)
        .json({ status: true, message: "Delete successful" });
    }
    return res
      .status(500)
      .json({ status: false, message: "Error deleting data" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const { q, lm, pn } = req.query;
    let books;
    let totalPageNumbers = 1;

    books = await getBooks({ status: "active" });
    totalPageNumbers = Math.ceil(books.length / lm);
    //formula: skip = pagelimit * (pagenumber -1)
    let skipRecords = lm * (pn - 1);
    if (q) {
      //query paramerter(filter, skiprecords, itemlimit)
      books = await getBooks(
        {
          $and: [
            { status: "active" },
            {
              $or: [
                { title: { $regex: q, $options: "i" } },
                { author: { $regex: q, $options: "i" } },
              ],
            },
          ],
        },
        skipRecords,
        lm
      );

      //get total number of books for the search without the skip and limit for totalpagenumber
      let allBooks = await getBooks({
        $and: [
          { status: "active" },
          {
            $or: [
              { title: { $regex: q, $options: "i" } },
              { author: { $regex: q, $options: "i" } },
            ],
          },
        ],
      });
      totalPageNumbers = Math.ceil(allBooks.length / lm);
    }

    if (books) {
      res.status(200).json({
        status: true,
        message: "Successfull retrieved pub book",
        books,
        totalPageNumbers,
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const getFeaturedBooks = async (req, res) => {
  try {
    const getMostBorrowed = async () => {
      const topBorrowed = await getBooksByOccurance("bookId");
      const topBorrowedIds = topBorrowed.map((book) => book._id);
      const topBorrowedBooks = await getBooks({ _id: { $in: topBorrowedIds } });
      return topBorrowedBooks;
    };

    const getNewlyIn = async () => {
      const newlyIn = await getBooksByOrder({}, { createdAt: -1 }, 4);
      return newlyIn;
    };

    const getMostReviewed = async () => {
      const mostReviewed = await getBooksByOrder({}, { averageRating: -1 }, 4);
      return mostReviewed;
    };

    const mostBorrowedBooks = await getMostBorrowed();
    const recentlyAddedBooks = await getNewlyIn();
    const mostRatedBooks = await getMostReviewed();

    if (mostBorrowedBooks) {
      return res.status(200).json({
        status: true,
        message: "Feature books fetch successful",
        mostBorrowedBooks,
        recentlyAddedBooks,
        mostRatedBooks,
      });
    }
    return res
      .status(500)
      .json({ status: false, message: "Error fetching data" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
