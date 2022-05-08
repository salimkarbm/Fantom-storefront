import express from 'express';
import verifyAuthToken from '../middlewares/authentication';
import {
  create,
  index,
  show,
  update,
  destroy,
  productCategory,
} from '../handlers/products';

const productRoutes = (app: express.Application) => {
  app.post('/api/products', verifyAuthToken, create);
  app.get('/api/products', index);
  app.get('/api/products/:id', show);
  app.put('/api/products/:id', verifyAuthToken, update);
  app.delete('/api/products/:id', verifyAuthToken, destroy);
  app.get('/api/product', productCategory);
};

export default productRoutes;
