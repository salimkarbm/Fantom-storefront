import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthUser, Authservices } from '../services/authentication';
import { UserStore } from '../models/users';

const store = new UserStore();
const authstore = new Authservices();

const secret = process.env.TOKEN_SECRET as string;

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
    const currentUser = await store.show(decoded.userId);
    if (!currentUser) {
      return res
        .status(401)
        .json({ message: 'The user belonging to this token no longer exist' });
    }
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({ message: 'invalid token' });
  }
};

export const authenticate = async (req: Request, res: Response) => {
  const user: AuthUser = {
    password: req.body.password,
    email: req.body.email,
  };
  if (!user.email || !user.password) {
    return res
      .status(400)
      .json({ message: 'please provide valid email and password' });
  }
  try {
    const authenticateUser = await authstore.authenticate(
      user.email,
      user.password
    );
    if (authenticateUser === null) {
      return res.status(401).json({ message: 'incorrect password or email' });
    }
    const token = jwt.sign({ userId: authenticateUser.id }, secret);
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const authRoutes = (app: express.Application) => {
  app.post('/api/login', authenticate);
};
