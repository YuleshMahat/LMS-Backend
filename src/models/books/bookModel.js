import Book from "./bookSchema";

export const addBook = (bookObj) => {
  return Book.insertOne(bookObj);
};
