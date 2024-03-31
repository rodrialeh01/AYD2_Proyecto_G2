import validator from "validator";
import ReviewRepository from "../repositories/reviewRepository.js";
import { folderBucket } from "../config/constants.js";
import { saveObj } from "../config/objectHandler.js";

const reviewRepository = new ReviewRepository();

export const createReview = async (req, res) => {
  try {
    const {idUser, idProduct, comment, rating} = req.body;
    let buffer = null;
    let originalname = null;

    if(req.file)
    {
      buffer = req.file.buffer;
      originalname = req.file.originalname;
    }

    if (!idUser || !idProduct || !comment) {
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

    if (!validator.isInt(rating.toString(), {min: 0, max: 5})) {
      res.response(null, 'Invalid rating', 400);
      return;
    }

    let image = "";

    if (buffer) {
      const extension = originalname.split('.').pop();
      const { Location } = await saveObj(buffer, extension, folderBucket.reviews);
      image = Location;
    }

    const review = {
      idUser,
      idProduct,
      comment,
      rating,
      image
    };

    const r = await reviewRepository.createReview(review);

    if (!r) {
      throw new Error('Review not created');
    }

    // obtener el id de la review creada
    const reviewCreated = await reviewRepository.getReviewById(r._id);
    // console.log(reviewCreated);

    res.response(reviewCreated, 'Review created', 200);

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

export const updateReview = async (req, res) => {
  try {
    const {idReview} = req.params;
    const {comment, rating} = req.body;

    if (!idReview || !comment || !rating) {
      res.response(null, 'Missing fields', 400);
      return;
    }

    if (!validator.isMongoId(idReview)) {
      res.response(null, 'Invalid review id', 400);
      return;
    }

    if (!validator.isInt(rating.toString(), {min: 1, max: 5})) {
      res.response(null, 'Invalid rating', 400);
      return;
    }

    const review = {
      comment,
      rating
    };

    console.log(review);

    const r = await reviewRepository.updateReview(idReview, review);

    if (!r) {
      throw new Error('Review not updated');
    }

    const reviewUpdated = await reviewRepository.getReviewById(idReview);

    res.response(reviewUpdated, 'Review updated', 200);

  } catch (error) {
    res.response(null, error.message, 500);
  }
};

export const updateComment = async (req, res) => {
  try {
    const {idReview} = req.params;
    const {comment} = req.body;

    if (!idReview || !comment) {
      res.response(null, 'Missing fields', 400);
      return;
    }

    if (!validator.isMongoId(idReview)) {
      res.response(null, 'Invalid review id', 400);
      return;
    }

    const review = {
      comment
    };

    const r = await reviewRepository.updateReview(idReview, review);

    if (!r) {
      throw new Error('Review not updated');
    }

    res.response(req.body, 'Review updated', 200);

  } catch (error) {
    res.response(null, error.message, 500);
  }
};

export const updateRating = async (req, res) => {
  try {
    const {idReview} = req.params;
    const {rating} = req.body;

    if (!idReview || !rating) {
      res.response(null, 'Missing fields', 400);
      return;
    }

    if (!validator.isMongoId(idReview)) {
      res.response(null, 'Invalid review id', 400);
      return;
    }

    if (!validator.isInt(rating.toString(), {min: 1, max: 5})) {
      res.response(null, 'Invalid rating', 400);
      return;
    }

    const review = {
      rating
    };

    const r = await reviewRepository.updateReview(idReview, review);

    if (!r) {
      throw new Error('Review not updated');
    }

    res.response(req.body, 'Review updated', 200);

  } catch (error) {
    res.response(null, error.message, 500);
  }
};

export const deleteReview = async (req, res) => {
  try {
    const {idReview} = req.params;

    if (!idReview) {
      res.response(null, 'Missing fields', 400);
      return;
    }

    if (!validator.isMongoId(idReview)) {
      res.response(null, 'Invalid review id', 400);
      return;
    }

    const r = await reviewRepository.deleteReview(idReview);

    if (!r) {
      throw new Error('Review not deleted');
    }

    res.response(null, 'Review deleted', 200);

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

export const getReportReviews = async (req, res) => {
  try {
    const reviews = await reviewRepository.getReportReviews();

    if (!reviews) {
      res.response(null, 'Reviews not found', 404);
    }

    res.response(reviews, 'Reviews found', 200);

  } catch (error) {
    res.response(null, error.message, 500);
  }
};