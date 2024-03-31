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

  async getReportReviews() {
    const pipeline = [
      {
        $group: {
          _id: '$idProduct',
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 },
          ratings: {
            $push: {
              rating: '$rating',
              count: { $sum: 1 },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          idProduct: '$_id',
          avgRating: { $round: ['$avgRating', 0] }, // Round the average rating to the nearest integer
          count: 1,
          ratings: 1,
        },
      },
    ];


    const rev = await Review.aggregate(pipeline);

    const countRatings = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
      0: 0,
    };

    rev.forEach((product) => {
      countRatings[product.avgRating] += 1;
    });


    const ratings = Object.keys(countRatings).map((key) => {
      return {
        rating: parseInt(key),
        count: countRatings[key],
        percentage: ((countRatings[key] / rev.length) * 100).toFixed(2)
      };
    });

    // console.log(ratings);

    return ratings;
  }
}

export default ReviewRepository;