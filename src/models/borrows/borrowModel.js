import Borrow from "./borrowSchema.js";

export const insertBook = (borrowObj) => {
  return Borrow.insertOne(borrowObj);
};

export const getBorrowedBooks = (filter) => {
  return Borrow.find(filter);
};
