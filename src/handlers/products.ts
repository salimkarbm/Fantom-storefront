import { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';

const store = new ProductStore();

export const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const newProduct = await store.create(product);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
export const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const update = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const updatedProduct = await store.update(req.params.id, product);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await store.destroy(req.params.id);
    res.status(204).json(deletedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const productCategory = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    const product = await store.productByCategory(category);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
