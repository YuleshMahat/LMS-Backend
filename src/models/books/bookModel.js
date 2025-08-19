import Book from "./bookSchema.js";

export const addBook = (bookObj) => {
  return Book.insertOne(bookObj);
};
