import { NextFunction, Request, Response } from 'express';
import HttpError from '../models/httpError.js';
import { TypedRequest } from '../types';
import { nanoid } from 'nanoid';

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

const signup = (
  req: TypedRequest<{
    name: string;
    email: string;
    password: string;
  }>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  if (USERS.find(u => u.email === email)) {
    return next(
      new HttpError('Could not create user, email already exists.', 422)
    );
  }
  const createdUser = {
    id: nanoid(),
    name,
    email,
    password
  };

  USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
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
