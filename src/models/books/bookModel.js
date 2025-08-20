import Book from "./bookSchema.js";

export const addBook = (bookObj) => {
  return Book.insertOne(bookObj);
};

export const getBooks = (filter) => {
  return Book.find(filter);
};
