import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

import HttpError from '../models/httpError.js';
import Place from '../models/place.js';
import User from '../models/user.js';
import {
  ILocation,
  IPlaceModel,
  IUserModel,
  TypedRequest
} from '../types/index.js';
import { getCoordsForAddress } from '../utils/location.js';

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
    const userWithPlaces = await User.findById(userId).populate<{
      places: IPlaceModel[];
    }>('places');

    if (!userWithPlaces || !userWithPlaces.places.length) {
      return next(
        new HttpError('Could not find a place for the provided user id.', 404)
      );
    }

    res.json({
      places: userWithPlaces.places.map(place =>
        place.toObject({ getters: true })
      )
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
    const place = await Place.findById(placeId).populate<{
      creator: IUserModel;
    }>('creator');
    if (!place) {
      return next(
        new HttpError('Could not find a place for the provided place id.', 404)
      );
    }
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await place.remove({ session: sess });
      await place.creator.places.pull(place);
      await place.creator.save({ session: sess });
      await sess.commitTransaction();
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
