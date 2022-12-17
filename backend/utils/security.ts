import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HttpError from '../models/httpError';

export const generateJWT = (
  userId: string,
  email: string,
  next: NextFunction
) => {
  let token: string;
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined');
    }
    token = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
      expiresIn: '6h'
    });
    return token;
  } catch (err) {
    return next(new HttpError('Logging in failed, please try again.', 500));
  }
};
