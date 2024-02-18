import Review from '../db/models/review.model.js';

class ReviewRepository {
  async createReview(review) {
    return await Review.create(review);
  }

  async getReviewsByProductId(idProduct) {
    return await Review.find({idProduct}).populate('idUser');
  }
}

export default ReviewRepository;