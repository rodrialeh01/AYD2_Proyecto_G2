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
  

  async getAllReviews() {
    return await Review.find({}).populate('idUser').populate('idProduct');
  }

  async getReviewById(idReview) {
    return await Review.findById(idReview).populate('idUser').populate('idProduct');
  }
}

export default ReviewRepository;