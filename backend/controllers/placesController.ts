import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import HttpError from '../models/httpError.js';
import { ILocation, IPlace, TypedRequest } from '../types/index.js';
import mongoose from 'mongoose';

import { getCoordsForAddress } from '../utils/location.js';
import Place from '../models/place.js';
import User from '../models/user.js';

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

const getPlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params.pid;
  try {
    const place = await Place.findById(placeId);
    if (!place) {
      return next(
        new HttpError('Could not find a place for the provided id.', 404)
      );
    }
    res.json({ place: place.toObject({ getters: true }) });
  } catch (error) {
    return next(
      new HttpError('Something went wrong, could not find a place.', 500)
    );
  }
};

const getPlacesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;
  try {
    const places = await Place.find({ creator: userId });
    if (!places.length) {
      return next(
        new HttpError('Could not find a place for the provided user id.', 404)
      );
    }
    res.json({
      places: places.map(place => place.toObject({ getters: true }))
    });
  } catch (error) {
    return next(
      new HttpError('Fetching places failed, please try again later.', 500)
    );
  }
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
    const user = await User.findById(creator);
    if (!user) {
      return next(new HttpError('Could not find user for provided id.', 404));
    }
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdPlace.save({ session: sess });
      user.places.push(createdPlace.id);
      await user.save({ session: sess });
      await sess.commitTransaction();
      res.status(201).json({ place: createdPlace });
    } catch (error) {
      return next(
        new HttpError('Creating place failed, please try again.', 500)
      );
    }
  } catch {
    return next(new HttpError('Creating place failed, please try again.', 500));
  }
};

const updatePlace = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const placeId = req.params.pid;
  const { title, description } = req.body;

  try {
    const place = await Place.findById(placeId);
    if (!place) {
      return next(
        new HttpError('Could not find a place for the provided place id.', 404)
      );
    }
    place.title = title;
    place.description = description;
    try {
      await place.save();
      res.status(200).json({ place: place.toObject({ getters: true }) });
    } catch (error) {
      return next(
        new HttpError('Something went wrong, could not update place.', 500)
      );
    }
  } catch (error) {
    return next(
      new HttpError('Something went wrong, could not update place.', 500)
    );
  }
};

const deletePlace = async (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params.pid;
  try {
    const place = await Place.findById(placeId);
    if (!place) {
      return next(
        new HttpError('Could not find a place for the provided place id.', 404)
      );
    }
    try {
      await place.remove();
    } catch (error) {
      return next(
        new HttpError('Something went wrong, could not delete place.', 500)
      );
    }
    res.status(200).json({ message: 'Deleted Place.' });
  } catch (error) {
    return next(
      new HttpError('Something went wrong, could not delete place.', 500)
    );
  }
};

export {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace
};
