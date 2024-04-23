import validator from "validator";
import ReviewRepository from "../repositories/reviewRepository.js";
import { folderBucket } from "../config/constants.js";
import { saveObj } from "../config/objectHandler.js";
import { LogBack } from '../log/bitacora.js';
import BitacoraBDRepository from "../repositories/bitacorabdRepository.js";

const reviewRepository = new ReviewRepository();
const logB = LogBack.getInstance();
const bdb = new BitacoraBDRepository();

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
      logB.addBitacora('ENDPOINT: /review/create - Faltan campos');
      res.response(null, 'Missing fields', 400);
      return;
    }

    if (!validator.isMongoId(idUser)) {
      logB.addBitacora('ENDPOINT: /review/create - idUser inválido');
      res.response(null, 'Invalid user id', 400);
      return;
    }

    if (!validator.isMongoId(idProduct)) {
      logB.addBitacora('ENDPOINT: /review/create - idProduct inválido');
      bdb.crearBitacoraBD('idProduct inválido para crear una review', 'INSERT', new Date());
      res.response(null, 'Invalid product id', 400);
      return;
    }

    if (!validator.isInt(rating.toString(), {min: 0, max: 5})) {
      logB.addBitacora('ENDPOINT: /review/create - Rating inválido');
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

    logB.addBitacora(`ENPOINT: /review/create, se ha creado una review del producto ${idProduct} por el usuario ${idUser}`);
    bdb.crearBitacoraBD(`Se ha creado una review en la tabla Review`, 'INSERT', new Date());
    res.response(reviewCreated, 'Review created', 200);

  } catch (error) {

    logB.addBitacora(`ENPOINT: /review/create, ha ocurrido un error al crear una review: ${error.message}`);
    bdb.crearBitacoraBD(`Error al crear una review en la tabla Review`, 'ERROR', new Date());
    res.response(null, error.message, 500);
  }
};

export const getReviewsByProductId = async (req, res) => {
  try {
    const {idProduct} = req.params;

    if (!idProduct) {
      logB.addBitacora('ENDPOINT: /review/product/:id - Faltan campos');
      res.response(null, 'Missing fields', 400);
      return;
    }

    if (!validator.isMongoId(idProduct)) {
      logB.addBitacora('ENDPOINT: /review/product/:id - idProduct inválido');
      res.response(null, 'Invalid product id', 400);
      return;
    }

    const reviews = await reviewRepository.getReviewsByProductId(idProduct);

    if (!reviews) {
      logB.addBitacora(`ENPOINT: /review/product/${idProduct}, no se han encontrado reviews del producto ${idProduct}`);
      res.response(null, 'Reviews not found', 404);
    }

    logB.addBitacora(`ENPOINT: /review/product/${idProduct}, se han encontrado reviews del producto ${idProduct}`);
    bdb.crearBitacoraBD(`Se han seleccionado las reviews del producto en la tabla Review`, 'SELECT', new Date());
    res.response(reviews, 'Reviews found', 200);

  } catch (error) {
    logB.addBitacora(`ENPOINT: /review/product/${idProduct}, ha ocurrido un error al buscar reviews: ${error.message}`);
    bdb.crearBitacoraBD(`Hubo un error en la tabla Review`, 'ERROR', new Date());
    res.response(null, error.message, 500);
  }
};

export const updateReview = async (req, res) => {
  try {
    const {idReview} = req.params;
    const {comment, rating} = req.body;

    if (!idReview || !comment || !rating) {
      logB.addBitacora('ENDPOINT: /review/update/:id - Faltan campos');
      res.response(null, 'Missing fields', 400);
      return;
    }

    if (!validator.isMongoId(idReview)) {
      logB.addBitacora('ENDPOINT: /review/update/:id - idReview inválido');
      res.response(null, 'Invalid review id', 400);
      return;
    }

    if (!validator.isInt(rating.toString(), {min: 1, max: 5})) {
      logB.addBitacora('ENDPOINT: /review/update/:id - Rating inválido');
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

    logB.addBitacora(`ENPOINT: /review/update/${idReview}, se ha actualizado la review ${idReview}`);
    bdb.crearBitacoraBD(`Se ha actualizado la review en la tabla Review`, 'UPDATE', new Date());
    res.response(reviewUpdated, 'Review updated', 200);

  } catch (error) {
    logB.addBitacora(`ENPOINT: /review/update/${idReview}, ha ocurrido un error al actualizar la review: ${error.message}`);
    bdb.crearBitacoraBD(`Hubo un error en la tabla Review`, 'ERROR', new Date());
    res.response(null, error.message, 500);
  }
};

export const updateComment = async (req, res) => {
  try {
    const {idReview} = req.params;
    const {comment} = req.body;

    if (!idReview || !comment) {
      logB.addBitacora('ENDPOINT: /review/update/:id - Faltan campos');
      res.response(null, 'Missing fields', 400);
      return;
    }

    if (!validator.isMongoId(idReview)) {
      logB.addBitacora('ENDPOINT: /review/update/:id - idReview inválido');
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

    logB.addBitacora(`ENPOINT: /review/update/${idReview}, se ha actualizado el comentario de la review ${idReview}`);
    bdb.crearBitacoraBD(`Se ha actualizado el comentario de la review en la tabla Review`, 'UPDATE', new Date());
    res.response(req.body, 'Review updated', 200);

  } catch (error) {
    logB.addBitacora(`ENPOINT: /review/update/${idReview}, ha ocurrido un error al actualizar la review: ${error.message}`);
    res.response(null, error.message, 500);
  }
};

export const updateRating = async (req, res) => {
  try {
    const {idReview} = req.params;
    const {rating} = req.body;

    if (!idReview || !rating) {
      logB.addBitacora('ENDPOINT: /review/update/:id - Faltan campos');
      res.response(null, 'Missing fields', 400);
      return;
    }

    if (!validator.isMongoId(idReview)) {
      logB.addBitacora('ENDPOINT: /review/update/:id - idReview inválido');
      res.response(null, 'Invalid review id', 400);
      return;
    }

    if (!validator.isInt(rating.toString(), {min: 1, max: 5})) {
      logB.addBitacora('ENDPOINT: /review/update/:id - Rating inválido');
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

    logB.addBitacora(`ENPOINT: /review/update/${idReview}, se ha actualizado el rating de la review ${idReview}`);
    bdb.crearBitacoraBD(`Se ha actualizado el rating de la review en la tabla Review`, 'UPDATE', new Date());
    res.response(req.body, 'Review updated', 200);

  } catch (error) {
    logB.addBitacora(`ENPOINT: /review/update/${idReview}, ha ocurrido un error al actualizar la review: ${error.message}`);
    res.response(null, error.message, 500);
  }
};

export const deleteReview = async (req, res) => {
  try {
    const {idReview} = req.params;

    if (!idReview) {
      logB.addBitacora('ENDPOINT: /review/delete/:id - Faltan campos');
      res.response(null, 'Missing fields', 400);
      return;
    }

    if (!validator.isMongoId(idReview)) {
      logB.addBitacora('ENDPOINT: /review/delete/:id - idReview inválido');
      res.response(null, 'Invalid review id', 400);
      return;
    }

    const r = await reviewRepository.deleteReview(idReview);

    if (!r) {
      throw new Error('Review not deleted');
    }

    logB.addBitacora(`ENPOINT: /review/delete/${idReview}, se ha eliminado la review ${idReview}`);
    bdb.crearBitacoraBD(`Se ha eliminado la review en la tabla Review`, 'DELETE', new Date());
    res.response(null, 'Review deleted', 200);

  } catch (error) {
    logB.addBitacora(`ENPOINT: /review/delete/${idReview}, ha ocurrido un error al eliminar la review: ${error.message}`);
    res.response(null, error.message, 500);
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewRepository.getAllReviews();

    if (!reviews) {
      logB.addBitacora(`ENPOINT: /review/all, no se han encontrado reviews`);
      res.response(null, 'Reviews not found', 404);
    }

    logB.addBitacora(`ENPOINT: /review/all, se han devuelto todas las reviews asociadas a los productos`);
    bdb.crearBitacoraBD(`Se han seleccionado todas las reviews en la tabla Review`, 'SELECT', new Date());
    res.response(reviews, 'Reviews found', 200);

  } catch (error) {
    logB.addBitacora(`ENPOINT: /review/all, ha ocurrido un error al buscar reviews: ${error.message}`);
    res.response(null, error.message, 500);
  }
}

export const getReportReviews = async (req, res) => {
  try {
    const reviews = await reviewRepository.getReportReviews();

    if (!reviews) {
      logB.addBitacora(`ENPOINT: /review/report, no se han encontrado reviews`);
      res.response(null, 'Reviews not found', 404);
    }

    logB.addBitacora(`ENPOINT: /review/report, se han devuelto el reporte de reviews`);
    bdb.crearBitacoraBD(`Se han seleccionado el reporte de reviews en la tabla Review`, 'SELECT', new Date());
    res.response(reviews, 'Reviews found', 200);

  } catch (error) {
    logB.addBitacora(`ENPOINT: /review/report, ha ocurrido un error al obtener el reporte de reviews: ${error.message}`);
    res.response(null, error.message, 500);
  }
};