import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/users';

const store = new UserStore();

const secret = process.env.TOKEN_SECRET as string;
export const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    password: req.body.password,
    email: req.body.email,
  };
  try {
    const existingUser = await store.checkExistingUser(user.email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'user with this email already exist' });
    }
    const newUser = await store.create(user);
    const token = jwt.sign({ userId: newUser.id }, secret);
    res.status(201).json({ token: token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};
export const index = async (req: Request, res: Response) => {
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

export const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const updateMe = async (req: Request, res: Response) => {
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

export const destroy = async (req: Request, res: Response) => {
  try {
    await store.destroy(req.params.id);
    res.status(204).json({ message: 'deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
