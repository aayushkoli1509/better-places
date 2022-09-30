import { NextFunction, Request, Response } from 'express';
import HttpError from '../models/httpError';
import { IPlace } from '../types';

const PLACES: IPlace[] = [
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

export { getPlaceById, getPlacesByUserId };
