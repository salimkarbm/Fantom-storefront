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

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const orderRoutes = (app: express.Application) => {
  app.post('/api/orders', verifyAuthToken, create);
  app.get('/api/orders', verifyAuthToken, index);
  app.get('/api/orders/:id', verifyAuthToken, show);
};

export default orderRoutes;
