import Review from '../db/models/review.model.js';

import { Bitacora } from '../bitacora/bitacora.js';
import BitacoraBDRepository from './bitacorabdRepository.js';

const bitacora = Bitacora.getInstance();
const bdb = new BitacoraBDRepository();

class ReviewRepository {
  async createReview(review) {

    try {

      bitacora.addBitacora("POST", 'Crear review');
      bdb.crearBitacoraBD(`Se añadió un nuevo registro en la tabla REVIEW`, 'INSERT', new Date());
      return await Review.create(review);

    } catch (error) {
      console.error(error);
      bdb.crearBitacoraBD(`Hubo un error en la tabla REVIEW`, 'ERROR', new Date());
      return res.response(null, error.message, 500);
    }
  }

  async getReviewsByProductId(idProduct) {

    try {
      bitacora.addBitacora("GET", 'Obtener reviews por ID de producto');
      bdb.crearBitacoraBD(`Se obtuvieron los registros de la tabla REVIEW con el id producot ${idProduct}`, 'SELECT', new Date());
      return await Review.find({ idProduct }).populate('idUser');
    } catch (error) {
      console.error(error);
      bdb.crearBitacoraBD(`Hubo un error en la tabla REVIEW`, 'ERROR', new Date());
      res.response(null, error.message, 500);
    }
  }

  async updateReview(idReview, review) {
    try {
      bitacora.addBitacora("PUT", 'Actualizar review');
      bdb.crearBitacoraBD(`Se actualizó un registro en la tabla REVIEW`, 'UPDATE', new Date());
      return await Review.findByIdAndUpdate(idReview, review, {new: true});
    } catch (error) {
      console.error(error);
      bdb.crearBitacoraBD(`Hubo un error en la tabla REVIEW con el id ${idReview}`, 'ERROR', new Date());
      return res.response(null, error.message, 500);
    }
  }

  async deleteReview(idReview) {
    try {
      bitacora.addBitacora("DELETE", 'Eliminar review');
      bdb.crearBitacoraBD(`Se eliminó un registro en la tabla REVIEW con el id ${idReview}`, 'DELETE', new Date());
      return await Review.findByIdAndDelete(idReview);
    } catch (error) {
      console.error(error);
      bdb.crearBitacoraBD(`Hubo un error en la tabla REVIEW`, 'ERROR', new Date());
      return res.response(null, error.message, 500);
    }
  }
  

  async getAllReviews() {
    try {
      bitacora.addBitacora("GET", 'Obtener todos los reviews');
      bdb.crearBitacoraBD(`Se obtuvieron los registros de la tabla REVIEW`, 'SELECT', new Date());
      return await Review.find({}).populate('idUser').populate('idProduct');
    } catch (error) {
      console.error(error);
      bdb.crearBitacoraBD(`Hubo un error en la tabla REVIEW`, 'ERROR', new Date());
      return res.response(null, error.message, 500);
    }
  }

  async getReviewById(idReview) {
    try {
      bitacora.addBitacora("GET", 'Obtener review por ID');
      bdb.crearBitacoraBD(`Se obtuvo un registro de la tabla REVIEW con el id ${idReview}`, 'SELECT', new Date());
      return await Review.findById(idReview).populate('idUser').populate('idProduct');
    } catch (error) {
      console.error(error);
      bdb.crearBitacoraBD(`Hubo un error en la tabla REVIEW`, 'ERROR', new Date());
      return res.response(null, error.message, 500);
    }
  }

  async getReportReviews() {
    try {
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

      bitacora.addBitacora("GET", 'Obtener reporte de reviews');
      bdb.crearBitacoraBD(`Se obtuvieron los registros de la tabla REVIEW`, 'SELECT', new Date());
  
      return ratings;
    } catch (error) {
      console.error(error);
      bdb.crearBitacoraBD(`Hubo un error en la tabla REVIEW`, 'ERROR', new Date());
      return res.response(null, error.message, 500);
    }
  }
}

export default ReviewRepository;