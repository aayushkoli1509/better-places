import express from 'express';
import {
  getPlaceById,
  getPlacesByUserId,
  createPlace
} from '../controllers/placesController.js';

const router = express.Router();

router.get('/:pid', getPlaceById);

router.get('/user/:uid', getPlacesByUserId);

router.post('/', createPlace);

export default router;
