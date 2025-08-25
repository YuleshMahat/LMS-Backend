import Book from "./bookSchema.js";

export const addBook = (bookObj) => {
  return Book.insertOne(bookObj);
};

export const getBooks = (filter) => {
  return Book.find(filter);
};

export const editBook = (filter, update) => {
  return Book.findOneAndUpdate(filter, update);
};

export const deleteBookById = (id) => {
  return Book.deleteOne({ _id: id });
};
