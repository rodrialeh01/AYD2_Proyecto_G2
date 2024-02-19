import validator from "validator";
import ReviewRepository from "../repositories/reviewRepository.js";
import User from "../db/models/user.model.js";

const reviewRepository = new ReviewRepository();

export const createReview = async (req, res) => {
  try {
    const {idUser, idProduct, comment, rating} = req.body;

    if (!idUser || !idProduct || !comment || !rating) {
      res.response(null, 'Missing fields', 400);
      return;
    }

    if (!validator.isMongoId(idUser)) {
      res.response(null, 'Invalid user id', 400);
      return;
    }

    if (!validator.isMongoId(idProduct)) {
      res.response(null, 'Invalid product id', 400);
      return;
    }

    // rating must be a number between 1 and 5
    if (!validator.isInt(rating.toString(), {min: 1, max: 5})) {
      res.response(null, 'Invalid rating', 400);
      return;
    }

    const review = {
      idUser,
      idProduct,
      comment,
      rating
    };

    console.log(review);

    const r = await reviewRepository.createReview(review);

    if (!r) {
      throw new Error('Review not created');
    }

    res.response(req.body, 'Review created', 200);

  } catch (error) {
    res.response(null, error.message, 500);
  }
};

export const getReviewsByProductId = async (req, res) => {
  try {
    const {idProduct} = req.params;

    if (!idProduct) {
      res.response(null, 'Missing fields', 400);
      return;
    }

    if (!validator.isMongoId(idProduct)) {
      res.response(null, 'Invalid product id', 400);
      return;
    }

    const reviews = await reviewRepository.getReviewsByProductId(idProduct);

    if (!reviews) {
      res.response(null, 'Reviews not found', 404);
    }

    res.response(reviews, 'Reviews found', 200);

  } catch (error) {
    res.response(null, error.message, 500);
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewRepository.getAllReviews();

    if (!reviews) {
      res.response(null, 'Reviews not found', 404);
    }

    res.response(reviews, 'Reviews found', 200);

  } catch (error) {
    res.response(null, error.message, 500);
  }
}

export const deleteReview = async (req, res) => {
  try {
    const {id} = req.params;

    if (!id) {
      res.response(null, 'Missing fields', 400);
      return;
    }

    if (!validator.isMongoId(id)) {
      res.response(null, 'Invalid review id', 400);
      return;
    }

    const r = await reviewRepository.deleteReview(id);

    if (!r) {
      throw new Error('Review not deleted');
    }

    res.response(null, 'Review deleted', 200);

  } catch (error) {
    res.response(null, error.message, 500);
  }
};