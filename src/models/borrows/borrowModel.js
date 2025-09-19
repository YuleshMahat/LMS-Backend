import Borrow from "./borrowSchema.js";

export const insertBorrows = (borrowObj) => {
  return Borrow.insertMany(borrowObj);
};

export const getBorrowedBooks = (filter) => {
  return Borrow.find(filter);
};

export const getBooksByOccurance = (property) => {
  return Borrow.aggregate([
    {
      $group: {
        _id: `$` + property, // group by bookId
        occuranceCount: { $sum: 1 }, // count how many times each bookId appears
      },
    },
    {
      $sort: { booccuranceCountrowCount: -1 }, // sort descending
    },
    {
      $limit: 4, // get 4 books only
    },
  ]);
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
