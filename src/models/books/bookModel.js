import Book from "./bookSchema.js";

export const addBook = (bookObj) => {
  return Book.insertOne(bookObj);
};

export const getBooks = (filter, skipRecords, pageLimit) => {
  return Book.find(filter).skip(skipRecords).limit(pageLimit);
};

export const getBooksByOrder = (filter, order, limit) => {
  return Book.find(filter).sort(order).limit(limit);
};

export const editBook = (filter, update) => {
  return Book.findOneAndUpdate(filter, update);
};

export const editManybooks = (filter, update) => {
  return Book.updateMany(filter, { $set: update });
};

export const deleteBookById = (id) => {
  return Book.deleteOne({ _id: id });
};
