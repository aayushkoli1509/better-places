import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import HttpError from '../models/httpError.js';
import User from '../models/user.js';
import { TypedRequest } from '../types';

import bcrypt from 'bcrypt';
import { generateJWT } from '../utils/security.js';

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
    file: Express.Multer.File;
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
    let hashedPassword: string;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      return next(new HttpError('Could not create user', 500));
    }

    const createdUser = new User({
      name,
      email,
      image: req.file!.path,
      hashedPassword,
      places: []
    });

    try {
      await createdUser.save();
    } catch {
      return next(new HttpError('Signing up failed, please try again.', 500));
    }
    const token = generateJWT(createdUser.id, createdUser.email, next);

    res
      .status(201)
      .json({ userId: createdUser.id, email: createdUser.email, token });
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
    if (!identifiedUser) {
      return next(
        new HttpError(
          'Could not identify user, credentials seem to be wrong.',
          401
        )
      );
    }

    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, identifiedUser.password);
    } catch (err) {
      return next(
        new HttpError('Could not log you in, please try again.', 500)
      );
    }

    if (!isValidPassword) {
      return next(
        new HttpError(
          'Could not identify user, credentials seem to be wrong.',
          401
        )
      );
    }

    const token = generateJWT(identifiedUser.id, identifiedUser.email, next);

    res.status(201).json({ userId: identifiedUser.id, email, token });
  } catch {
    return next(new HttpError('Logging in failed, please try again.', 500));
  }
};

export { getUsers, signup, login };
