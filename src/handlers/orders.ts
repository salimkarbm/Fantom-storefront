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

const showUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await store.showUserOrders(req.params.id);
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const orderToDelete = await store.destroy(req.params.id);
    res.status(204).json(orderToDelete);
  } catch (err) {
    res.status(400).json(err);
  }
};

const currentOrders = async (req: Request, res: Response) => {
  try {
    const currentOrder = await store.currentOrders(req.params.id);
    res.json(currentOrder);
  } catch (err) {
    res.status(400).send(err);
  }
};

const completeOrders = async (req: Request, res: Response) => {
  try {
    const completeOrder = await store.completeOrders(req.params.id);
    res.json(completeOrder);
  } catch (err) {
    res.status(400).send(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const productId = req.params.id;
  const quantity = parseInt(req.body.quantity, 10);
  try {
    const addProducts = await store.addProduct(quantity, orderId, productId);
    res.status(200).json(addProducts);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const orderRoutes = (app: express.Application) => {
  app.post('/api/orders', verifyAuthToken, create);
  app.get('/api/orders', verifyAuthToken, index); //show all orders
  app.get('/api/orders/:id', verifyAuthToken, show); //show a single order
  app.get('/api/users/:id/orders', verifyAuthToken, showUserOrders); //show current orders by user (id)
  app.delete('/api/orders/:id', verifyAuthToken, destroy);
  app.get('/api/users/:id/current-orders', verifyAuthToken, currentOrders);
  app.get('/api/users/:id/complete-orders', verifyAuthToken, completeOrders);
  app.post('/api/orders/:id/product/:id', verifyAuthToken, addProduct);
};

export default orderRoutes;
