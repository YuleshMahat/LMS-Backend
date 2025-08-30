import { createReview, fetchReviews } from "../models/reviews/reviewModel.js";

export const insertReview = async (req, res) => {
  try {
    const reviewObject = req.body;
    const review = await createReview(reviewObject);
    if (review) {
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
    const reviews = await fetchReviews({ isApproved: true });
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
