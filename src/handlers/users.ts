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
    email: req.body.email,
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
    if (!users) {
      return res.status(404).json({ message: 'user not found' });
    }
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
    if (currentUser) {
      req.user = currentUser;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: 'invalid token' });
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    password: req.body.password,
    email: req.body.email,
  };
  if (!user.email || !user.password) {
    return res
      .status(400)
      .json({ message: 'please provide valid email and password' });
  }
  try {
    const authenticateUser = await store.authenticate(
      user.email,
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

const updateMe = async (req: Request, res: Response) => {
  const { firstname, lastname, email } = req.body;
  try {
    const updateUser = await store.updateMe(
      req.params.id,
      firstname,
      lastname,
      email
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    await store.destroy(req.params.id);
    res.status(204).json({ message: 'deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const userRoutes = (app: express.Application) => {
  app.post('/api/users', create);
  app.get('/api/users', verifyAuthToken, index);
  app.get('/api/users/:id', verifyAuthToken, show);
  app.post('/api/login', verifyAuthToken, authenticate);
  app.patch('/api/users/:id', verifyAuthToken, updateMe);
  app.delete('/api/users/:id', verifyAuthToken, destroy);
};

export default userRoutes;
