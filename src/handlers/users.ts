import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/users';

const store = new UserStore();
const secret = process.env.TOKEN_SECRET as string;

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ userId: newUser.id }, secret);
    res.status(201).json({ token: token });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ err });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstname.trim(),
    lastName: req.body.lastname.trim(),
    password: req.body.password.trim(),
  };
  try {
    const authenticateUser = await store.authenticate(
      user.firstName,
      user.lastName,
      user.password
    );
    if (authenticateUser === null) {
      return res.status(401).json({ message: 'incorrect password' });
    }
    const token = jwt.sign({ userId: authenticateUser.id }, secret);
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return res
        .status(401)
        .json({ error: 'You are not logged in! please login to gain access.' });
    }
    interface myToken {
      userId: string;
      iat: number;
      exp: number;
    }
    const decoded = jwt.verify(token, secret) as unknown as myToken;
    await store.show(decoded.userId);
    next();
  } catch (error) {
    res.status(401).json({ message: 'invalid token' });
  }
};
const userRoutes = (app: express.Application) => {
  app.post('/api/users', create);
  app.get('/api/users', verifyAuthToken, index);
  app.get('/api/users/:id', verifyAuthToken, show);
  app.post('/api/login', verifyAuthToken, authenticate);
};

export default userRoutes;
