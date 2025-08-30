import Review from "./reviewSchema.js";

export const createReview = (reviewObject) => {
  return Review.insertOne(reviewObject);
};

export const fetchReviews = (filter) => {
  return Review.find(filter);
};
