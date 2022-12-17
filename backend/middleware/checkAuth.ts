import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpError from '../models/httpError.js';

export default (req: Request, _: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('No authorization headers found');
    }
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token || token === '') {
      throw new Error('No token found');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
      email: string;
    };
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.log(error);
    return next(new HttpError('You are not authenticated!', 401));
  }
};
