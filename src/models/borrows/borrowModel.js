import Borrow from "./borrowSchema.js";

export const insertBorrows = (borrowObj) => {
  return Borrow.insertMany(borrowObj);
};

export const getBorrowedBooks = (filter) => {
  return Borrow.find(filter);
};

export const getBookById = (filter) => {
  return Borrow.findById(filter);
};

export const returnBookQuery = (filter, object) => {
  return Borrow.updateOne(filter, object);
};

export const updateBorrowQuery = (filter, object) => {
  return Borrow.updateOne(filter, object);
};
