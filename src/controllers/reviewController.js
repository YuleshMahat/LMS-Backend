import {
  createReview,
  fetchReviews,
  updateReviewQuery,
} from "../models/reviews/reviewModel.js";
import { updateBookAverageRating } from "../utils/bookRatingHandler.js";

export const insertReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const reviewObject = req.body;
    const payload = {
      userId,
      ...reviewObject,
      userName: req.user.fName + " " + req.user.lName,
    };
    const review = await createReview(payload);
    if (review) {
      //update the average rating of the book
      updateBookAverageRating(review.bookId);
      res.status(200).json({ status: true, message: "Review created" });
    } else {
      res
        .status(500)
        .json({ status: false, message: "Failed to create review" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await fetchReviews({});
    if (reviews) {
      res
        .status(200)
        .json({ status: true, message: "Review fetched", reviews });
    } else {
      res
        .status(500)
        .json({ status: false, message: "Failed to retrieve reviews" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const getApprovedReviews = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    console.log(bookId);
    const reviews = await fetchReviews({
      isApproved: true,
      bookId,
    });
    console.log(reviews);
    if (reviews) {
      res
        .status(200)
        .json({ status: true, message: "Approved Review fetched", reviews });
    } else {
      res
        .status(500)
        .json({ status: false, message: "Failed to retrieve reviews" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { _id, isApproved } = req.body;
    const review = await updateReviewQuery({ _id }, { isApproved });
    if (review) {
      res.status(200).json({ status: true, message: "Review status updated" });
    } else {
      res
        .status(500)
        .json({ status: false, message: "Failed to update review" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
