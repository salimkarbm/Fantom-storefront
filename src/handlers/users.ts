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
const userRoutes = (app: express.Application) => {
  app.post('/api/users', create);
  app.get('/api/users', index);
};

export default userRoutes;
