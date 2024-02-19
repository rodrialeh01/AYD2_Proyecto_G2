import Review from '../db/models/review.model.js';

class ReviewRepository {
  async createReview(review) {
    return await Review.create(review);
  }

  async getReviewsByProductId(idProduct) {
    return await Review.find({idProduct}).populate('idUser');
  }

  async updateReview(idReview, review) {
    return await Review.findByIdAndUpdate(idReview, review, {new: true});
  }

  async deleteReview(idReview) {
    return await Review.findByIdAndDelete(idReview);
  }

}

export default ReviewRepository;