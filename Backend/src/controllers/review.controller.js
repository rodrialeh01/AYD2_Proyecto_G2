export const createReview = async (req, res) => {
  try {
    const {idUser, comment, rating} = req.body;

    if (!idUser || !comment || !rating) {
      res.response(null, 'Missing fields', 400);
      return;
    }

    res.response(req.body, 'Review created', 200);
  } catch (error) {
    res.response(null, error.message, 500);
  }
};