import { Request, Response } from 'express';
import { Order, OrderStore } from '../models/orders';

const store = new OrderStore();

export const create = async (req: Request, res: Response) => {
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

export const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const showUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await store.showUserOrders(req.params.id);
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const orderToDelete = await store.destroy(req.params.id);
    res.status(204).json(orderToDelete);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const currentOrders = async (req: Request, res: Response) => {
  try {
    const currentOrder = await store.currentOrders(req.params.id);
    res.json(currentOrder);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const completeOrders = async (req: Request, res: Response) => {
  try {
    const completeOrder = await store.completeOrders(req.params.id);
    res.json(completeOrder);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const addProduct = async (req: Request, res: Response) => {
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
