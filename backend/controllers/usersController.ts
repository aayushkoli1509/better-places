import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import HttpError from '../models/httpError.js';
import User from '../models/user.js';
import { TypedRequest } from '../types';

const getUsers = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ users: users.map(user => user.toObject({ getters: true })) });
  } catch {
    return next(
      new HttpError('Fetching users failed, please try again later.', 500)
    );
  }
};

const signup = async (
  req: TypedRequest<{
    name: string;
    email: string;
    password: string;
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
  const { name, email, password } = req.body;
  try {
    if (await User.findOne({ email })) {
      return next(
        new HttpError('Could not create user, email already exists.', 422)
      );
    }

    const createdUser = new User({
      name,
      email,
      image: `https://ui-avatars.com/api/?background=random&name=${name}`,
      password,
      places: []
    });

    try {
      await createdUser.save();
    } catch {
      return next(new HttpError('Signing up failed, please try again.', 500));
    }
    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
  } catch (error) {
    return next(
      new HttpError('Signing up failed, please try again later.', 500)
    );
  }
};

const login = async (
  req: TypedRequest<{
    email: string;
    password: string;
  }>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const identifiedUser = await User.findOne({ email });
    if (!identifiedUser || identifiedUser.password !== password) {
      return next(
        new HttpError(
          'Could not identify user, credentials seem to be wrong.',
          401
        )
      );
    }
    res.status(201).json({ user: identifiedUser.toObject({ getters: true }) });
  } catch {
    return next(new HttpError('Logging in failed, please try again.', 500));
  }
};

export { getUsers, signup, login };
