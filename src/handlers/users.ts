import express, { Request, Response } from 'express';
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
    console.log(err);
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
    console.log(err);
    res.status(400).json({ error: err });
  }
};

const userRoutes = (app: express.Application) => {
  app.post('/api/users', create);
  app.get('/api/users', index);
  app.get('/api/users/:id', show);
  app.post('/api/login', authenticate);
};

export default userRoutes;
