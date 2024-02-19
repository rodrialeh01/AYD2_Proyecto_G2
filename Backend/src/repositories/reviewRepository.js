import Review from '../db/models/review.model.js';

class ReviewRepository {
  async createReview(review) {
    return await Review.create(review);
  }

  async getReviewsByProductId(idProduct) {
    return await Review.find({idProduct}).populate('idUser');
  }

  async deleteReview(id) {
    return await Review.findByIdAndDelete(id);
  }

  async getAllReviews() {
    return await Review.find({}).populate('idUser').populate('idProduct');
  }
}

export default ReviewRepository;