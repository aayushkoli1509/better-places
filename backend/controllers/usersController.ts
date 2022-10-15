import { NextFunction, Request, Response } from 'express';
import HttpError from '../models/httpError.js';
import { TypedRequest } from '../types';
import { validationResult } from 'express-validator';
import User from '../models/user.js';

const USERS = [
  {
    id: 'u1',
    name: 'Mubin',
    email: 'test@test.com',
    password: 'test'
  }
];

const getUsers = (_: Request, res: Response) => {
  res.json({ users: USERS });
};

const signup = async (
  req: TypedRequest<{
    name: string;
    email: string;
    password: string;
    places: string;
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
  const { name, email, password, places } = req.body;
  try {
    if (await User.findOne({ email })) {
      return next(
        new HttpError('Could not create user, email already exists.', 422)
      );
    }

    const createdUser = new User({
      name,
      email,
      image: 'https://picsum.photos/200',
      password,
      places
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

const login = (
  req: TypedRequest<{
    email: string;
    password: string;
  }>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const identifiedUser = USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError(
        'Could not identify user, credentials seem to be wrong.',
        401
      )
    );
  }
  res.json({ message: 'Logged in!' });
};

export { getUsers, signup, login };
