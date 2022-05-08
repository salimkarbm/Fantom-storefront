import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserStore } from '../models/users';

const store = new UserStore();

const secret = process.env.TOKEN_SECRET as string;
const verifyAuthToken = async (
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

export default verifyAuthToken;
