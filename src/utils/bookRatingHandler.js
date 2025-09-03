import { fetchReviews } from "../models/reviews/reviewModel.js";
import { editBook } from "../models/books/bookModel.js";

export const updateBookAverageRating = async (bookId) => {
  const reviews = await fetchReviews({ bookId: bookId });

  //reduce function gives out one result by carrying out a -
  //- function in each item of array and accumulating result
  const reviewsSum = reviews.reduce((sum, r) => sum + r.rating, 0);

  const averageRating = reviewsSum / reviews.length;

  return editBook({ _id: bookId }, { averageRating });
};
