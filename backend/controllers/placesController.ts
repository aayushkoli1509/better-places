import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import HttpError from '../models/httpError.js';
import { ILocation, IPlace, TypedRequest } from '../types/index.js';

import { getCoordsForAddress } from '../utils/location.js';
import Place from '../models/place.js';

let PLACES: IPlace[] = [
  {
    id: 'p1',
    title: 'Mt. Yoshino',
    description:
      'UNESCO World Heritage site with thousands of cherry trees, ancient temples and pilgrimage routes.',
    imageURL:
      'https://media.cntraveler.com/photos/58d2c0a97e623821b9f3181d/master/w_1920%2Cc_limit/yoshinoyama--japan-GettyImages-488852217.jpg',
    address: 'Yoshinoyama, Yoshino, Yoshino District, Nara 639-3115, Japan',
    location: { lat: 34.357773537015, lng: 135.8704440224147 },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Ashikaga Flower Park',
    description:
      'Charming flower gardens offering 8 seasonal thematic displays & a spring wisteria festival.',
    imageURL:
      'https://media.cntraveler.com/photos/58d2b8c7ed5947303561e5f3/master/w_1920%2Cc_limit/ashikaga-flower-park-wisteria-GettyImages-473675978.jpg',
    address: 'Ashikaga Flower Park, Ashigaka, Japan',
    location: { lat: 36.31432898191364, lng: 139.52017240117095 },
    creator: 'u2'
  }
];

const getPlaceById = (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params.pid;
  const place = PLACES.find(p => p.id === placeId);
  if (!place) {
    return next(
      new HttpError('Could not find a place for the provided id.', 404)
    );
  }
  res.json({ place });
};

const getPlacesByUserId = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.uid;
  const places = PLACES.filter(p => p.creator === userId);

  if (!places.length) {
    return next(
      new HttpError('Could not find a place for the provided user id.', 404)
    );
  }
  res.json({ places });
};

const createPlace = async (
  req: TypedRequest<{
    title: string;
    description: string;
    coordinates: ILocation;
    address: string;
    creator: string;
  }>,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates: ILocation;

  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    creator,
    imageURL:
      'https://media.cntraveler.com/photos/58d2b8c7ed5947303561e5f3/master/w_1920%2Cc_limit/ashikaga-flower-park-wisteria-GettyImages-473675978.jpg'
  });

  try {
    await createdPlace.save();
  } catch (error) {
    return next(new HttpError('Creating place failed, please try again.', 500));
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const placeId = req.params.pid;
  const { title, description } = req.body;
  const place = PLACES.find(p => p.id === placeId);

  if (!place) {
    return next(
      new HttpError('Could not find a place for the provided place id.', 404)
    );
  }
  const updatedPlace = { ...place, title, description };
  const placeIndex = PLACES.findIndex(p => p.id === placeId);
  PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params.pid;
  if (!PLACES.find(p => p.id === placeId)) {
    return next(
      new HttpError('Could not find a place for the provided place id.', 404)
    );
  }
  PLACES = PLACES.filter(p => p.id !== placeId);

  res.status(200).json({ message: 'Deleted Place.' });
};

export {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace
};
