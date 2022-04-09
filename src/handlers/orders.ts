import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/orders';
import { verifyAuthToken } from './users';

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
  const order: Order = {
    status: req.body.status,
    userId: String(req.user.id),
  };
  try {
    const orders = await store.create(order);
    res.status(201).json(orders);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ err });
  }
};

const orderRoutes = (app: express.Application) => {
  app.post('/api/orders', verifyAuthToken, create);
  app.get('/api/orders', verifyAuthToken, index);
};

export default orderRoutes;
