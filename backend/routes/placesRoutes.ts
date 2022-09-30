import express from 'express';
import {
  getPlaceById,
  getPlacesByUserId
} from '../controllers/placesController';

const router = express.Router();

router.get('/:pid', getPlaceById);

router.get('/user/:uid', getPlacesByUserId);

export default router;
