import axios from 'axios';

import HttpError from '../models/httpError.js';

export const getCoordsForAddress = async (address: string) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.GOOGLE_API_KEY}`
  );
  const data = response.data;
  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }
  const coordinates = data.results[0].geometry.location;
  return coordinates;
};
