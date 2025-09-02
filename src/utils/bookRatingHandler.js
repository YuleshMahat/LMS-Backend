export const updateBookAverageRating = async (bookId) => {
  const reviews = await fetchReviews({ _id: bookId });
  const reviewsSum = reviews.reduce((sum, r) => sum + r.rating, 0);

  const averageRating = reviewsSum / reviews.length;

  return editBook({ _id: bookId }, { averageRating });
};
